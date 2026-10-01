import React, { useState, useEffect } from 'react';
import { 
  X, Copy, Check, ExternalLink, DollarSign, Users, MousePointerClick, 
  ArrowUpRight, Wallet, Building2, CreditCard, Clock, CheckCircle2, 
  AlertCircle, LogOut, Sparkles, Share2, HelpCircle, Shield, ArrowRight,
  TrendingUp, RefreshCw, Award, Lock, Key, Crown, Edit3, Save, QrCode, Eye
} from 'lucide-react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut,
  User 
} from 'firebase/auth';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  getDoc, 
  doc,
  updateDoc,
  increment
} from 'firebase/firestore';
import { auth, db } from '../firebase';
import { 
  AffiliateProfile, 
  AffiliateOrderRecord, 
  WithdrawalRequestRecord, 
  registerAffiliateAccount, 
  signInWithGoogleAccount,
  submitWithdrawalRequest,
  updateAffiliateCode
} from '../services/affiliateService';
import { 
  VIETNAM_BANKS, 
  generateVietQrUrl, 
  generateVietQrFallbackUrl, 
  findBank 
} from '../utils/vietqr';
import { AdminAffiliatePortal } from './AdminAffiliatePortal';

interface AffiliateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AffiliateModal: React.FC<AffiliateModalProps> = ({ isOpen, onClose }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<AffiliateProfile | null>(null);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [adminPinUnlocked, setAdminPinUnlocked] = useState<boolean>(false);
  
  // Login / Register Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [phone, setPhone] = useState('');
  const [customRefCode, setCustomRefCode] = useState('');

  // Dashboard Tabs
  const [activeTab, setActiveTab] = useState<'overview' | 'withdraw' | 'orders' | 'history' | 'admin'>('overview');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [domainChoice, setDomainChoice] = useState<'com' | 'vn' | 'origin' | 'custom'>('com');
  const [customDomainInput, setCustomDomainInput] = useState('https://vuacapcutpro.com');

  // Custom Affiliate Code Editing
  const [isEditingCode, setIsEditingCode] = useState(false);
  const [newCodeInput, setNewCodeInput] = useState('');
  const [codeUpdating, setCodeUpdating] = useState(false);
  const [codeMessage, setCodeMessage] = useState<{ text: string; success: boolean } | null>(null);

  // Orders and Withdrawals data
  const [orders, setOrders] = useState<AffiliateOrderRecord[]>([]);
  const [withdrawals, setWithdrawals] = useState<WithdrawalRequestRecord[]>([]);

  // Withdrawal form & QR Preview Test
  const [withdrawAmount, setWithdrawAmount] = useState<string>('');
  const [bankName, setBankName] = useState<string>('MB Bank');
  const [bankAccountNumber, setBankAccountNumber] = useState<string>('');
  const [bankAccountName, setBankAccountName] = useState<string>('');
  const [withdrawSubmitting, setWithdrawSubmitting] = useState<boolean>(false);
  const [showBankQrTest, setShowBankQrTest] = useState<boolean>(false);

  // Listen to Auth State
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        // Fetch or subscribe to user profile doc
        const profileRef = doc(db, 'affiliates', user.uid);
        const unsubProfile = onSnapshot(profileRef, (snap) => {
          if (snap.exists()) {
            const data = snap.data() as AffiliateProfile;
            setProfile(data);
            if (data.bankName) setBankName(data.bankName);
            if (data.bankAccountNumber) setBankAccountNumber(data.bankAccountNumber);
            if (data.bankAccountName) setBankAccountName(data.bankAccountName);
          }
        });

        // Query orders
        const ordersQuery = query(
          collection(db, 'affiliate_orders'),
          where('affiliateUid', '==', user.uid),
          orderBy('createdAt', 'desc')
        );
        const unsubOrders = onSnapshot(ordersQuery, (snap) => {
          const list: AffiliateOrderRecord[] = [];
          snap.forEach((d) => list.push({ id: d.id, ...d.data() } as AffiliateOrderRecord));
          setOrders(list);
        }, (err) => console.warn('Orders query subscription note:', err));

        // Query withdrawals
        const withdrawalsQuery = query(
          collection(db, 'withdrawal_requests'),
          where('affiliateUid', '==', user.uid),
          orderBy('createdAt', 'desc')
        );
        const unsubWithdrawals = onSnapshot(withdrawalsQuery, (snap) => {
          const list: WithdrawalRequestRecord[] = [];
          snap.forEach((d) => list.push({ id: d.id, ...d.data() } as WithdrawalRequestRecord));
          setWithdrawals(list);
        }, (err) => console.warn('Withdrawals query subscription note:', err));

        return () => {
          unsubProfile();
          unsubOrders();
          unsubWithdrawals();
        };
      } else {
        setProfile(null);
        setOrders([]);
        setWithdrawals([]);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  if (!isOpen) return null;

  // Referral link generator - Supports .com, .vn, current origin, or custom domain like https://vuacapcutpro...
  const getCleanDomain = () => {
    if (domainChoice === 'com') return 'https://vuacapcutpro.com';
    if (domainChoice === 'vn') return 'https://vuacapcutpro.vn';
    if (domainChoice === 'custom') {
      let val = customDomainInput.trim();
      if (!val) return 'https://vuacapcutpro.com';
      if (!val.startsWith('http://') && !val.startsWith('https://')) {
        val = 'https://' + val;
      }
      return val.replace(/\/+$/, '');
    }
    return typeof window !== 'undefined' ? window.location.origin : 'https://vuacapcutpro.com';
  };

  const baseDomain = getCleanDomain();
  const referralLink = profile ? `${baseDomain}/?ref=${profile.affiliateCode}` : '';

  const handleCopyLink = () => {
    if (!referralLink) return;
    navigator.clipboard.writeText(referralLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyCode = () => {
    if (!profile?.affiliateCode) return;
    navigator.clipboard.writeText(profile.affiliateCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleSaveNewCode = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!profile?.uid || !newCodeInput.trim()) return;
    setCodeUpdating(true);
    setCodeMessage(null);
    const res = await updateAffiliateCode(profile.uid, newCodeInput.trim());
    if (res.success && res.code) {
      setProfile(prev => prev ? { ...prev, affiliateCode: res.code! } : null);
      setIsEditingCode(false);
      setCodeMessage({ text: res.message, success: true });
      setTimeout(() => setCodeMessage(null), 4000);
    } else {
      setCodeMessage({ text: res.message, success: false });
    }
    setCodeUpdating(false);
  };

  const handleEmailPasswordAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setLoading(true);

    try {
      if (authMode === 'login') {
        await signInWithEmailAndPassword(auth, email.trim(), password);
        setSuccessMessage('Đăng nhập thành công!');
      } else {
        if (!displayName.trim()) throw new Error('Vui lòng nhập họ tên của bạn');
        if (password.length < 6) throw new Error('Mật khẩu tối thiểu 6 ký tự');
        await registerAffiliateAccount(email.trim(), password, displayName.trim(), phone.trim(), customRefCode.trim());
        setSuccessMessage('Tạo tài khoản CTV thành công! Chào mừng bạn gia nhập mạng lưới.');
      }
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setErrorMessage('Email hoặc mật khẩu không chính xác.');
      } else if (err.code === 'auth/email-already-in-use') {
        setErrorMessage('Email này đã được đăng ký. Vui lòng chuyển sang tab Đăng Nhập.');
      } else {
        setErrorMessage(err.message || 'Đã có lỗi xảy ra, vui lòng thử lại.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setErrorMessage('');
    setLoading(true);
    try {
      await signInWithGoogleAccount();
      setSuccessMessage('Đăng nhập Google thành công!');
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Không thể đăng nhập bằng tài khoản Google.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setProfile(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleWithdrawalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setWithdrawSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    const numAmount = parseInt(withdrawAmount.replace(/[^0-9]/g, ''), 10) || 0;
    const res = await submitWithdrawalRequest(
      profile, 
      numAmount, 
      bankName, 
      bankAccountNumber.trim(), 
      bankAccountName.trim()
    );

    if (res.success) {
      setSuccessMessage(res.message);
      setWithdrawAmount('');
      setActiveTab('history');
    } else {
      setErrorMessage(res.message);
    }
    setWithdrawSubmitting(false);
  };

  // Test referral simulation function for demonstration / testing
  const handleSimulateOrder = async () => {
    if (!profile) return;
    try {
      const dummyAmount = 299000;
      const rate = profile.commissionRate || 18;
      const commission = Math.round((dummyAmount * rate) / 100);
      await updateDoc(doc(db, 'affiliates', profile.uid), {
        balanceAvailable: increment(commission),
        ordersCount: increment(1),
        totalEarned: increment(commission),
        updatedAt: new Date().toISOString()
      });
      setSuccessMessage(`Đã thử nghiệm cộng thành công hoa hồng +${commission.toLocaleString('vi-VN')}đ vào ví!`);
    } catch (err: any) {
      setErrorMessage(err.message || 'Lỗi khi thử nghiệm');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div 
        className="bg-[#100727] border-2 border-purple-500/70 rounded-3xl max-w-4xl w-full my-auto relative shadow-2xl shadow-purple-950 text-left overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Gradient Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-amber-400 via-fuchsia-500 to-purple-600"></div>

        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-purple-800/50 flex items-center justify-between bg-purple-950/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 text-purple-950">
              <DollarSign className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black text-white">
                  Cổng Cộng Tác Viên (Affiliate Portal)
                </h3>
                <span className="text-[10px] bg-amber-400 text-purple-950 font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Hoa hồng 18-24%
                </span>
              </div>
              <p className="text-xs text-purple-300">
                Kiếm thu nhập thụ động cùng Vua Capcutpro • Tự động rút tiền về tài khoản ngân hàng
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (profile?.role === 'admin' || currentUser?.email?.toLowerCase() === 'marketingaimaster@gmail.com' || adminPinUnlocked) {
                  setActiveTab(activeTab === 'admin' ? 'overview' : 'admin');
                } else {
                  const pin = window.prompt('Nhập mã PIN Quản Trị Chủ Shop (Mặc định: 8888 hoặc đăng nhập email marketingaimaster@gmail.com):');
                  if (pin === '8888') {
                    setAdminPinUnlocked(true);
                    setActiveTab('admin');
                  } else if (pin !== null) {
                    setErrorMessage('Mã PIN không đúng.');
                  }
                }
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                activeTab === 'admin'
                  ? 'bg-amber-400 text-purple-950 border-amber-300 font-black shadow-md'
                  : 'bg-purple-900/60 hover:bg-amber-950/70 text-amber-300 border-amber-500/40'
              }`}
            >
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span>Chủ Shop (Admin)</span>
            </button>

            <button
              onClick={onClose}
              className="text-purple-300 hover:text-white p-2 rounded-full bg-purple-900/60 hover:bg-purple-800/80 border border-purple-700/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {/* Notification Messages */}
          {errorMessage && (
            <div className="p-3.5 bg-rose-950/70 border border-rose-500/50 rounded-2xl flex items-center gap-2 text-rose-200 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3.5 bg-emerald-950/70 border border-emerald-500/50 rounded-2xl flex items-center gap-2 text-emerald-200 text-xs">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* If Admin view is active without CTV login */}
          {!currentUser && activeTab === 'admin' && adminPinUnlocked ? (
            <AdminAffiliatePortal />
          ) : !currentUser ? (
            <div className="max-w-md mx-auto py-2">
              {/* Auth Mode Switcher */}
              <div className="flex bg-purple-950/80 p-1 rounded-2xl border border-purple-800/60 mb-6">
                <button
                  type="button"
                  onClick={() => { setAuthMode('login'); setErrorMessage(''); }}
                  className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                    authMode === 'login'
                      ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-purple-950 shadow-md'
                      : 'text-purple-300 hover:text-white'
                  }`}
                >
                  Đăng Nhập CTV
                </button>
                <button
                  type="button"
                  onClick={() => { setAuthMode('register'); setErrorMessage(''); }}
                  className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                    authMode === 'register'
                      ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-purple-950 shadow-md'
                      : 'text-purple-300 hover:text-white'
                  }`}
                >
                  Đăng Ký CTV Mới
                </button>
              </div>

              {/* Quick Google Sign In */}
              <button
                type="button"
                onClick={handleGoogleAuth}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2.5 bg-white hover:bg-slate-100 text-slate-900 font-bold py-3 px-4 rounded-2xl text-xs sm:text-sm transition-all shadow-lg mb-4"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                </svg>
                <span>Đăng nhập nhanh với Google</span>
              </button>

              <div className="flex items-center gap-3 my-4">
                <div className="flex-1 h-px bg-purple-800/60"></div>
                <span className="text-[11px] text-purple-400 font-medium">Hoặc dùng Email</span>
                <div className="flex-1 h-px bg-purple-800/60"></div>
              </div>

              {/* Email Form */}
              <form onSubmit={handleEmailPasswordAuth} className="space-y-3.5">
                {authMode === 'register' && (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-purple-200 mb-1">
                        Họ và Tên của bạn:
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="VD: Trần Văn Nam"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className="w-full bg-purple-950/80 border border-purple-700/60 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-purple-200 mb-1">
                        Số điện thoại / Zalo:
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="VD: 0988776655"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-purple-950/80 border border-purple-700/60 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-purple-200 mb-1">
                        Mã giới thiệu mong muốn (Tự chọn hoặc để trống hệ thống tạo tự động):
                      </label>
                      <input
                        type="text"
                        placeholder="VD: NAMCAPCUT (viết liền không dấu)"
                        value={customRefCode}
                        onChange={(e) => setCustomRefCode(e.target.value.toUpperCase())}
                        className="w-full bg-purple-950/80 border border-purple-700/60 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400 uppercase tracking-wider"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-xs font-bold text-purple-200 mb-1">
                    Email của bạn:
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="email@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-purple-950/80 border border-purple-700/60 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-purple-200 mb-1">
                    Mật khẩu:
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Tối thiểu 6 ký tự"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-purple-950/80 border border-purple-700/60 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 hover:from-amber-400 hover:to-yellow-200 text-purple-950 font-black py-3 rounded-2xl text-xs sm:text-sm transition-all shadow-lg shadow-amber-500/20 cursor-pointer disabled:opacity-50 mt-4"
                >
                  {loading ? 'Đang xử lý...' : authMode === 'login' ? 'Đăng Nhập Cổng CTV' : 'Đăng Ký & Nhận Link Tiếp Thị'}
                </button>
              </form>

              {/* Highlights for Partners */}
              <div className="mt-8 pt-6 border-t border-purple-900/60 grid grid-cols-2 gap-3 text-center">
                <div className="bg-purple-950/40 p-3 rounded-2xl border border-purple-800/40">
                  <span className="text-amber-300 font-extrabold text-base">18% - 24%</span>
                  <p className="text-[11px] text-purple-300 mt-0.5">Hoa hồng mỗi đơn hàng</p>
                </div>
                <div className="bg-purple-950/40 p-3 rounded-2xl border border-purple-800/40">
                  <span className="text-emerald-400 font-extrabold text-base">Rút Tự Động</span>
                  <p className="text-[11px] text-purple-300 mt-0.5">Về mọi ngân hàng VN</p>
                </div>
              </div>
            </div>
          ) : (
            /* VIEW 2: LOGGED IN CTV DASHBOARD */
            <div className="space-y-6">
              {/* Partner User Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-purple-950/50 border border-purple-800/60">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-fuchsia-500 flex items-center justify-center text-white font-black text-lg shadow-md">
                    {profile?.displayName?.charAt(0) || 'C'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-white text-sm sm:text-base">
                        {profile?.displayName || 'Cộng Tác Viên'}
                      </span>
                      <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-500/40 font-bold px-2 py-0.5 rounded-full">
                        Đang Hoạt Động
                      </span>
                      {profile?.role === 'admin' && (
                        <span className="text-[10px] bg-red-950 text-red-300 border border-red-500/40 font-bold px-2 py-0.5 rounded-full">
                          ADMIN
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-purple-300">
                      Mã CTV: <span className="text-amber-400 font-bold tracking-wider">{profile?.affiliateCode}</span> • Mức hoa hồng: <span className="text-emerald-400 font-bold">{profile?.commissionRate || 18}%</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1.5 text-xs text-purple-300 hover:text-white bg-purple-900/60 hover:bg-purple-800 px-3 py-2 rounded-xl border border-purple-700/60 transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Đăng xuất</span>
                  </button>
                </div>
              </div>

              {/* Referral Link & Share Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-purple-950 via-indigo-950 to-purple-950 border border-amber-500/40 shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-amber-300 font-bold text-xs">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>LINK TIẾP THỊ ĐỘC QUYỀN CỦA BẠN</span>
                  </div>
                  <span className="text-[11px] text-purple-300">
                    Khách bấm link mua là bạn tự động nhận hoa hồng
                  </span>
                </div>

                {/* Domain Selector & Custom Domain Input */}
                <div className="space-y-2 my-2 pt-2 border-t border-purple-800/40">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] text-purple-300 font-medium">Định dạng tên miền:</span>
                    <button
                      type="button"
                      onClick={() => setDomainChoice('com')}
                      className={`text-[11px] px-2.5 py-0.5 rounded-lg font-bold transition-all cursor-pointer ${
                        domainChoice === 'com'
                          ? 'bg-amber-400 text-purple-950 font-black shadow-sm'
                          : 'bg-purple-900/60 text-purple-300 hover:text-white border border-purple-700/60'
                      }`}
                    >
                      vuacapcutpro.com (Chính thức)
                    </button>
                    <button
                      type="button"
                      onClick={() => setDomainChoice('vn')}
                      className={`text-[11px] px-2.5 py-0.5 rounded-lg font-bold transition-all cursor-pointer ${
                        domainChoice === 'vn'
                          ? 'bg-amber-400 text-purple-950 font-black shadow-sm'
                          : 'bg-purple-900/60 text-purple-300 hover:text-white border border-purple-700/60'
                      }`}
                    >
                      vuacapcutpro.vn
                    </button>
                    <button
                      type="button"
                      onClick={() => setDomainChoice('origin')}
                      className={`text-[11px] px-2.5 py-0.5 rounded-lg font-bold transition-all cursor-pointer ${
                        domainChoice === 'origin'
                          ? 'bg-amber-400 text-purple-950 font-black shadow-sm'
                          : 'bg-purple-900/60 text-purple-300 hover:text-white border border-purple-700/60'
                      }`}
                    >
                      Host hiện tại
                    </button>
                    <button
                      type="button"
                      onClick={() => setDomainChoice('custom')}
                      className={`text-[11px] px-2.5 py-0.5 rounded-lg font-bold transition-all cursor-pointer ${
                        domainChoice === 'custom'
                          ? 'bg-amber-400 text-purple-950 font-black shadow-sm'
                          : 'bg-purple-900/60 text-purple-300 hover:text-white border border-purple-700/60'
                      }`}
                    >
                      ⚙️ Tùy chỉnh URL/Domain...
                    </button>
                  </div>

                  {domainChoice === 'custom' && (
                    <div className="flex items-center gap-2 bg-[#12072b] p-2 rounded-xl border border-purple-700/60">
                      <span className="text-[11px] text-purple-300 font-semibold whitespace-nowrap">Tiền tố link:</span>
                      <input
                        type="text"
                        value={customDomainInput}
                        onChange={(e) => setCustomDomainInput(e.target.value)}
                        placeholder="https://vuacapcutpro.com"
                        className="flex-1 bg-black/40 border border-purple-800 rounded-lg px-2.5 py-1 text-xs text-amber-200 font-mono focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  )}
                </div>

                {/* Link Bar with 1-Click Copy */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mt-2">
                  <div className="flex-1 bg-black/40 border border-purple-700/60 rounded-xl px-3.5 py-2.5 text-xs font-mono text-amber-200 truncate select-all">
                    {referralLink}
                  </div>
                  <button
                    onClick={handleCopyLink}
                    className={`flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                      copiedLink
                        ? 'bg-emerald-500 text-white'
                        : 'bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-purple-950 shadow-md shadow-amber-500/20'
                    }`}
                  >
                    {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedLink ? 'Đã Sao Chép Link!' : 'Sao Chép Link'}</span>
                  </button>
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-purple-900/80 hover:bg-purple-800 text-purple-200 rounded-xl font-semibold text-xs border border-purple-700/60 transition-colors"
                  >
                    {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    <span>Mã: {profile?.affiliateCode}</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsEditingCode(!isEditingCode);
                      setNewCodeInput(profile?.affiliateCode || '');
                      setCodeMessage(null);
                    }}
                    className="flex items-center justify-center gap-1 px-3 py-2.5 bg-indigo-900/60 hover:bg-indigo-800 text-indigo-200 rounded-xl font-semibold text-xs border border-indigo-700/60 transition-colors"
                    title="Đổi mã giới thiệu"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Đổi Mã</span>
                  </button>
                </div>

                {/* Inline Custom Affiliate Code Editor */}
                {isEditingCode && (
                  <form onSubmit={handleSaveNewCode} className="mt-3 p-3 bg-purple-950/70 border border-amber-500/50 rounded-xl space-y-2 animate-fadeIn">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      <div className="flex-1">
                        <label className="block text-[11px] font-bold text-amber-300 mb-1">
                          Nhập mã tiếp thị mới của bạn (Viết hoa, không dấu, 3-20 ký tự):
                        </label>
                        <input
                          type="text"
                          value={newCodeInput}
                          onChange={(e) => setNewCodeInput(e.target.value.toUpperCase().replace(/[^A-Z0-9_-]/g, ''))}
                          placeholder="VD: TUANANH, CAPCUTPRO, VIP..."
                          className="w-full bg-[#12072b] border border-purple-700 rounded-lg px-3 py-1.5 text-xs text-yellow-300 font-mono font-bold focus:outline-none focus:border-amber-400"
                        />
                      </div>
                      <div className="flex items-end gap-2 pt-2 sm:pt-0">
                        <button
                          type="submit"
                          disabled={codeUpdating || !newCodeInput.trim() || newCodeInput.trim() === profile?.affiliateCode}
                          className="bg-amber-400 hover:bg-amber-300 text-purple-950 font-black px-3.5 py-2 rounded-lg text-xs transition-colors disabled:opacity-50 flex items-center gap-1"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>{codeUpdating ? 'Đang lưu...' : 'Lưu Mã Mới'}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsEditingCode(false)}
                          className="bg-purple-900 hover:bg-purple-800 text-purple-300 px-3 py-2 rounded-lg text-xs"
                        >
                          Hủy
                        </button>
                      </div>
                    </div>
                    {codeMessage && (
                      <p className={`text-[11px] font-medium ${codeMessage.success ? 'text-emerald-300' : 'text-rose-300'}`}>
                        {codeMessage.text}
                      </p>
                    )}
                  </form>
                )}

                {/* Quick Share Buttons */}
                <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-purple-800/40 text-[11px] text-purple-300">
                  <span className="flex items-center gap-1 font-semibold text-purple-200">
                    <Share2 className="w-3.5 h-3.5" />
                    Chia sẻ nhanh:
                  </span>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-500 text-white px-2.5 py-1 rounded-lg font-medium transition-colors"
                  >
                    Facebook
                  </a>
                  <a
                    href={`https://zalo.me/share?url=${encodeURIComponent(referralLink)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-sky-600 hover:bg-sky-500 text-white px-2.5 py-1 rounded-lg font-medium transition-colors"
                  >
                    Zalo
                  </a>
                  <a
                    href={`https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent('Nâng cấp CapCut Pro giá rẻ uy tín - Vua Capcutpro')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-cyan-600 hover:bg-cyan-500 text-white px-2.5 py-1 rounded-lg font-medium transition-colors"
                  >
                    Telegram
                  </a>
                </div>
              </div>

              {/* 4 Realtime Metrics Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {/* Metric 1: Clicks */}
                <div className="bg-[#170a38] border border-purple-800/60 rounded-2xl p-4 shadow-lg">
                  <div className="flex items-center justify-between text-purple-300 text-xs mb-1">
                    <span>Lượt Click Link</span>
                    <MousePointerClick className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white">
                    {profile?.clicksCount || 0}
                  </div>
                  <p className="text-[11px] text-indigo-300 mt-1">Truy cập từ link giới thiệu</p>
                </div>

                {/* Metric 2: Orders */}
                <div className="bg-[#170a38] border border-purple-800/60 rounded-2xl p-4 shadow-lg">
                  <div className="flex items-center justify-between text-purple-300 text-xs mb-1">
                    <span>Đơn Hàng Mua</span>
                    <Users className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white">
                    {profile?.ordersCount || 0}
                  </div>
                  <p className="text-[11px] text-emerald-300 mt-1">Khách đã đặt mua</p>
                </div>

                {/* Metric 3: Available Balance */}
                <div className="bg-gradient-to-br from-purple-950 to-amber-950/60 border border-amber-500/40 rounded-2xl p-4 shadow-lg">
                  <div className="flex items-center justify-between text-amber-200 text-xs mb-1">
                    <span>Số Dư Khả Dụng</span>
                    <Wallet className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-yellow-400 truncate">
                    {(profile?.balanceAvailable || 0).toLocaleString('vi-VN')}đ
                  </div>
                  <p className="text-[11px] text-amber-300/80 mt-1">Sẵn sàng để rút về bank</p>
                </div>

                {/* Metric 4: Pending Balance */}
                <div className="bg-[#170a38] border border-purple-800/60 rounded-2xl p-4 shadow-lg">
                  <div className="flex items-center justify-between text-purple-300 text-xs mb-1">
                    <span>Đang Chờ Duyệt</span>
                    <Clock className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-purple-200 truncate">
                    {(profile?.balancePending || 0).toLocaleString('vi-VN')}đ
                  </div>
                  <p className="text-[11px] text-purple-300 mt-1">Sẽ cộng vào ví sau khi khách thanh toán</p>
                </div>
              </div>

              {/* Navigation Tabs Inside Dashboard */}
              <div className="flex flex-wrap items-center gap-2 border-b border-purple-800/60 pb-2">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'overview'
                      ? 'bg-amber-400 text-purple-950 shadow-md'
                      : 'text-purple-300 hover:text-white bg-purple-950/40'
                  }`}
                >
                  Tổng Quan & Hướng Dẫn
                </button>
                <button
                  onClick={() => setActiveTab('withdraw')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    activeTab === 'withdraw'
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 shadow-md'
                      : 'text-purple-300 hover:text-white bg-purple-950/40'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Rút Tiền Ngân Hàng</span>
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'orders'
                      ? 'bg-amber-400 text-purple-950 shadow-md'
                      : 'text-purple-300 hover:text-white bg-purple-950/40'
                  }`}
                >
                  Đơn Hàng ({orders.length})
                </button>
                <button
                  onClick={() => setActiveTab('history')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'history'
                      ? 'bg-amber-400 text-purple-950 shadow-md'
                      : 'text-purple-300 hover:text-white bg-purple-950/40'
                  }`}
                >
                  Lịch Sử Rút ({withdrawals.length})
                </button>

                {/* Admin Control Tab */}
                <button
                  onClick={() => {
                    if (profile?.role === 'admin' || currentUser?.email?.toLowerCase() === 'marketingaimaster@gmail.com' || adminPinUnlocked) {
                      setActiveTab('admin');
                    } else {
                      const pin = window.prompt('Nhập mã PIN Quản Trị Chủ Shop (Mặc định: 8888):');
                      if (pin === '8888') {
                        setAdminPinUnlocked(true);
                        setActiveTab('admin');
                      } else if (pin !== null) {
                        setErrorMessage('Mã PIN không đúng.');
                      }
                    }
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ml-auto ${
                    activeTab === 'admin'
                      ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-purple-950 shadow-md font-black'
                      : 'text-amber-300 hover:text-white bg-amber-950/60 border border-amber-500/40'
                  }`}
                >
                  <Crown className="w-3.5 h-3.5 text-amber-400" />
                  <span>👑 Quản Trị Shop</span>
                </button>
              </div>

              {/* TAB 1: OVERVIEW & INSTRUCTIONS */}
              {activeTab === 'overview' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-purple-950/40 border border-purple-800/60 p-4 rounded-2xl">
                      <div className="w-8 h-8 rounded-xl bg-purple-900 flex items-center justify-center text-amber-400 font-black text-sm mb-3">
                        1
                      </div>
                      <h4 className="text-white font-bold text-sm mb-1">Lấy Link Chia Sẻ</h4>
                      <p className="text-xs text-purple-300 leading-relaxed">
                        Copy link tiếp thị độc quyền của bạn dán lên Facebook, TikTok Bio, YouTube, Zalo hoặc gửi cho bạn bè có nhu cầu làm video.
                      </p>
                    </div>

                    <div className="bg-purple-950/40 border border-purple-800/60 p-4 rounded-2xl">
                      <div className="w-8 h-8 rounded-xl bg-purple-900 flex items-center justify-center text-amber-400 font-black text-sm mb-3">
                        2
                      </div>
                      <h4 className="text-white font-bold text-sm mb-1">Khách Bấm Mua Gói</h4>
                      <p className="text-xs text-purple-300 leading-relaxed">
                        Hệ thống tự động lưu Cookie mã CTV trong 30 ngày. Khi khách đặt mua bất kỳ gói nào, đơn hàng tự động tính hoa hồng cho bạn.
                      </p>
                    </div>

                    <div className="bg-purple-950/40 border border-purple-800/60 p-4 rounded-2xl">
                      <div className="w-8 h-8 rounded-xl bg-purple-900 flex items-center justify-center text-amber-400 font-black text-sm mb-3">
                        3
                      </div>
                      <h4 className="text-white font-bold text-sm mb-1">Bấm Nút Rút Tiền</h4>
                      <p className="text-xs text-purple-300 leading-relaxed">
                        Số dư đạt từ 100k là bạn có thể bấm nút Rút Tiền. Shop Tuấn Anh sẽ bắn tiền trực tiếp vào tài khoản ngân hàng của bạn.
                      </p>
                    </div>
                  </div>

                  {/* Test Action for User Verification */}
                  <div className="bg-indigo-950/40 border border-indigo-700/50 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="text-xs text-purple-200">
                      <span className="font-bold text-amber-300">💡 Chế độ thử nghiệm Database:</span> Bạn có thể bấm thử nút bên cạnh để xem hoa hồng được cộng realtime vào ví thế nào.
                    </div>
                    <button
                      onClick={handleSimulateOrder}
                      className="shrink-0 flex items-center gap-1.5 bg-purple-800 hover:bg-purple-700 text-purple-100 px-3.5 py-2 rounded-xl text-xs font-bold border border-purple-600 transition-colors"
                    >
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Thử Nghiệm Cộng Hoa Hồng</span>
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: WITHDRAWAL FORM */}
              {activeTab === 'withdraw' && (
                <div className="bg-purple-950/50 border border-purple-800/60 p-5 rounded-2xl max-w-xl mx-auto">
                  <div className="flex items-center gap-2 mb-4">
                    <Building2 className="w-5 h-5 text-amber-400" />
                    <h4 className="text-base font-black text-white">Yêu Cầu Rút Tiền Về Ngân Hàng</h4>
                  </div>

                  <form onSubmit={handleWithdrawalSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-purple-200 mb-1">
                        Số tiền muốn rút (Số dư khả dụng: {(profile?.balanceAvailable || 0).toLocaleString('vi-VN')}đ):
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          placeholder="Ví dụ: 200000"
                          value={withdrawAmount}
                          onChange={(e) => setWithdrawAmount(e.target.value)}
                          className="w-full bg-[#12072b] border border-purple-700/60 rounded-xl px-3.5 py-2.5 text-sm text-yellow-300 font-bold focus:outline-none focus:border-amber-400"
                        />
                        <span className="absolute right-3.5 top-2.5 text-xs text-purple-400 font-bold">VND</span>
                      </div>
                      {/* Quick amount chips */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          type="button"
                          onClick={() => setWithdrawAmount('100000')}
                          className="text-[11px] bg-purple-900/60 hover:bg-purple-800 text-purple-200 px-2 py-1 rounded-lg border border-purple-700/60"
                        >
                          100.000đ
                        </button>
                        <button
                          type="button"
                          onClick={() => setWithdrawAmount('200000')}
                          className="text-[11px] bg-purple-900/60 hover:bg-purple-800 text-purple-200 px-2 py-1 rounded-lg border border-purple-700/60"
                        >
                          200.000đ
                        </button>
                        <button
                          type="button"
                          onClick={() => setWithdrawAmount('500000')}
                          className="text-[11px] bg-purple-900/60 hover:bg-purple-800 text-purple-200 px-2 py-1 rounded-lg border border-purple-700/60"
                        >
                          500.000đ
                        </button>
                        <button
                          type="button"
                          onClick={() => setWithdrawAmount((profile?.balanceAvailable || 0).toString())}
                          className="text-[11px] bg-amber-950/80 hover:bg-amber-900 text-amber-300 px-2 py-1 rounded-lg border border-amber-600/60 font-bold"
                        >
                          Toàn bộ số dư
                        </button>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-bold text-purple-200">
                          Ngân hàng nhận tiền:
                        </label>
                        <span className="text-[10px] text-amber-300 font-mono bg-purple-900/60 px-2 py-0.5 rounded border border-purple-700/50">
                          BIN: {findBank(bankName).bin} ({findBank(bankName).code})
                        </span>
                      </div>
                      <select
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                        className="w-full bg-[#12072b] border border-purple-700/60 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                      >
                        {VIETNAM_BANKS.map((b) => (
                          <option key={b.code} value={b.shortName} className="bg-[#12072b] text-white">
                            {b.shortName} - {b.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-purple-200 mb-1">
                        Số tài khoản ngân hàng:
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="VD: 0363344348"
                        value={bankAccountNumber}
                        onChange={(e) => setBankAccountNumber(e.target.value.replace(/[^0-9a-zA-Z]/g, ''))}
                        className="w-full bg-[#12072b] border border-purple-700/60 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-purple-200 mb-1">
                        Tên chủ tài khoản (Viết in hoa không dấu):
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="VD: NGUYEN VAN MINH"
                        value={bankAccountName}
                        onChange={(e) => setBankAccountName(e.target.value.toUpperCase())}
                        className="w-full bg-[#12072b] border border-purple-700/60 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400 uppercase font-bold"
                      />
                    </div>

                    {/* Interactive Bank QR Test & Preview */}
                    <div className="pt-2 border-t border-purple-800/40 space-y-2">
                      <button
                        type="button"
                        onClick={() => setShowBankQrTest(!showBankQrTest)}
                        className="w-full py-2.5 px-3 rounded-xl bg-purple-900/60 hover:bg-purple-800 text-amber-300 font-bold text-xs flex items-center justify-center gap-2 border border-purple-700/60 transition-all cursor-pointer shadow-sm"
                      >
                        <QrCode className="w-4 h-4 text-amber-400" />
                        <span>{showBankQrTest ? 'Ẩn Mã QR Ngân Hàng' : '🔍 Kiểm Tra & Test Mã QR Nhận Tiền (VietQR Chuẩn)'}</span>
                      </button>

                      {showBankQrTest && (() => {
                        const testAmount = Math.max(100000, Number(withdrawAmount) || 100000);
                        const qrUrl = generateVietQrUrl(
                          bankName,
                          bankAccountNumber || '0363344348',
                          testAmount,
                          bankAccountName || 'NGUYEN VAN MINH',
                          `VuaCapcut ${profile?.affiliateCode || 'CTV'}`
                        );

                        return (
                          <div className="p-4 bg-[#100424] rounded-2xl border-2 border-amber-500/50 text-center space-y-3 shadow-xl animate-fadeIn">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-amber-300 font-bold flex items-center gap-1.5">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                <span>Mã QR Chuyển Tiền Napas247 Chuẩn</span>
                              </span>
                              <span className="text-[10px] text-purple-200 bg-purple-900/80 px-2 py-0.5 rounded font-mono">
                                BIN: {findBank(bankName).bin}
                              </span>
                            </div>

                            {/* Standard QR Code Display with safe fallback */}
                            <div className="bg-white p-3 rounded-2xl mx-auto w-56 h-auto shadow-2xl flex flex-col items-center justify-center">
                              <img
                                src={qrUrl}
                                alt={`Mã QR ${bankName}`}
                                className="w-full h-auto object-contain rounded-xl"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  if (!target.src.includes('qr_only')) {
                                    target.src = generateVietQrFallbackUrl(
                                      bankName,
                                      bankAccountNumber || '0363344348',
                                      testAmount,
                                      `VuaCapcut ${profile?.affiliateCode || 'CTV'}`
                                    );
                                  }
                                }}
                              />
                            </div>

                            <div className="text-xs text-purple-200 space-y-1 bg-purple-950/60 p-3 rounded-xl border border-purple-800/60 text-left">
                              <div className="flex justify-between">
                                <span className="text-purple-300">Ngân hàng:</span>
                                <strong className="text-white">{findBank(bankName).name}</strong>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-purple-300">Số tài khoản:</span>
                                <strong className="text-amber-300 font-mono select-all">{bankAccountNumber || '(Nhập STK ở trên)'}</strong>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-purple-300">Chủ tài khoản:</span>
                                <strong className="text-white uppercase select-all">{bankAccountName || '(Nhập tên ở trên)'}</strong>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-purple-300">Số tiền rút thử:</span>
                                <strong className="text-yellow-400 font-mono">{testAmount.toLocaleString('vi-VN')} VND</strong>
                              </div>
                            </div>

                            <div className="flex items-center justify-center gap-2 pt-1">
                              <a
                                href={qrUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[11px] text-amber-300 hover:text-amber-200 bg-purple-900/80 px-3 py-1.5 rounded-lg border border-purple-700/60 transition-colors"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                                <span>Mở ảnh QR tab mới</span>
                              </a>
                            </div>

                            <p className="text-[11px] text-purple-300/90 leading-relaxed">
                              📱 Bạn hãy lấy điện thoại mở app ngân hàng (VCB, MB, Techcom, TPBank...) quét thử mã QR này. App ngân hàng sẽ tự điền chính xác STK & Tên của bạn.
                            </p>
                          </div>
                        );
                      })()}
                    </div>

                    <button
                      type="submit"
                      disabled={withdrawSubmitting || (profile?.balanceAvailable || 0) < 100000}
                      className="w-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black py-3 rounded-2xl text-xs sm:text-sm transition-all shadow-lg shadow-emerald-500/20 cursor-pointer disabled:opacity-50 mt-2"
                    >
                      {withdrawSubmitting ? 'Đang gửi yêu cầu...' : 'Xác Nhận Rút Tiền Ngay'}
                    </button>
                    <p className="text-[11px] text-center text-purple-300/80">
                      * Số tiền rút tối thiểu: 100.000đ • Thời gian xử lý: 2 - 12 giờ làm việc
                    </p>
                  </form>
                </div>
              )}

              {/* TAB 3: REFERRAL ORDERS */}
              {activeTab === 'orders' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-purple-300">
                    <span>Danh sách khách hàng đặt mua qua link của bạn:</span>
                    <span>Tổng cộng: <strong className="text-white">{orders.length} đơn</strong></span>
                  </div>

                  {orders.length === 0 ? (
                    <div className="bg-purple-950/30 border border-purple-800/40 rounded-2xl p-8 text-center text-xs text-purple-300">
                      <p>Chưa có đơn hàng nào phát sinh.</p>
                      <p className="text-amber-300 font-semibold mt-1">
                        Hãy gửi link tiếp thị cho bạn bè để bắt đầu nhận đơn đầu tiên!
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-purple-800/60 text-purple-300">
                            <th className="py-2.5 px-3">Thời gian</th>
                            <th className="py-2.5 px-3">Khách hàng</th>
                            <th className="py-2.5 px-3">Gói mua</th>
                            <th className="py-2.5 px-3">Giá trị</th>
                            <th className="py-2.5 px-3">Hoa hồng</th>
                            <th className="py-2.5 px-3">Trạng thái</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-purple-900/40 text-purple-200">
                          {orders.map((o) => (
                            <tr key={o.id || o.createdAt} className="hover:bg-purple-900/20">
                              <td className="py-3 px-3 text-purple-400">
                                {new Date(o.createdAt).toLocaleDateString('vi-VN')}
                              </td>
                              <td className="py-3 px-3 font-semibold text-white">
                                {o.customerName}
                              </td>
                              <td className="py-3 px-3">
                                {o.planName}
                              </td>
                              <td className="py-3 px-3 font-mono">
                                {o.orderAmount.toLocaleString('vi-VN')}đ
                              </td>
                              <td className="py-3 px-3 font-bold text-amber-400">
                                +{o.commissionAmount.toLocaleString('vi-VN')}đ
                              </td>
                              <td className="py-3 px-3">
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  o.status === 'approved' 
                                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                                    : 'bg-amber-950 text-amber-300 border border-amber-500/40'
                                }`}>
                                  {o.status === 'approved' ? 'Đã cộng ví' : 'Chờ xác nhận'}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: WITHDRAWALS HISTORY */}
              {activeTab === 'history' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-purple-300">
                    <span>Lịch sử các lần bạn yêu cầu rút tiền:</span>
                    <span>Tổng: <strong className="text-white">{withdrawals.length} lệnh</strong></span>
                  </div>

                  {withdrawals.length === 0 ? (
                    <div className="bg-purple-950/30 border border-purple-800/40 rounded-2xl p-8 text-center text-xs text-purple-300">
                      <p>Bạn chưa thực hiện lệnh rút tiền nào.</p>
                      <p className="text-amber-300 font-semibold mt-1">
                        Khi số dư đạt tối thiểu 100k, bạn có thể gửi yêu cầu rút tiền bất cứ lúc nào!
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-purple-800/60 text-purple-300">
                            <th className="py-2.5 px-3">Ngày gửi</th>
                            <th className="py-2.5 px-3">Số tiền rút</th>
                            <th className="py-2.5 px-3">Ngân hàng</th>
                            <th className="py-2.5 px-3">Số TK / Chủ TK</th>
                            <th className="py-2.5 px-3">Trạng thái</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-purple-900/40 text-purple-200">
                          {withdrawals.map((w) => (
                            <tr key={w.id || w.createdAt} className="hover:bg-purple-900/20">
                              <td className="py-3 px-3 text-purple-400">
                                {new Date(w.createdAt).toLocaleDateString('vi-VN')}
                              </td>
                              <td className="py-3 px-3 font-bold text-yellow-400 font-mono">
                                {w.amount.toLocaleString('vi-VN')}đ
                              </td>
                              <td className="py-3 px-3">
                                {w.bankName}
                              </td>
                              <td className="py-3 px-3">
                                <div className="font-mono text-white">{w.bankAccountNumber}</div>
                                <div className="text-[10px] text-purple-300">{w.bankAccountName}</div>
                              </td>
                              <td className="py-3 px-3">
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  w.status === 'completed' 
                                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                                    : 'bg-amber-950 text-amber-300 border border-amber-500/40'
                                }`}>
                                  {w.status === 'completed' ? 'Đã Chuyển Khoản' : 'Đang Xử Lý'}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 5: ADMIN MANAGEMENT DASHBOARD */}
              {activeTab === 'admin' && (
                <AdminAffiliatePortal />
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-purple-800/50 bg-[#0d041e] flex flex-wrap items-center justify-between text-xs text-purple-300 gap-2">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>Hệ thống cơ sở dữ liệu Firebase Cloud tự động & an toàn tuyệt đối</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://zalo.me/0363344348"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-300 font-bold transition-colors underline"
            >
              Hỗ trợ CTV qua Zalo: 0363344348
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
