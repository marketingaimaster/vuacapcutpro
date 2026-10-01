import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  onSnapshot, 
  increment, 
  serverTimestamp,
  orderBy,
  limit
} from 'firebase/firestore';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  signInWithPopup,
  User
} from 'firebase/auth';
import { auth, db, googleProvider } from '../firebase';

export interface AffiliateProfile {
  uid: string;
  email: string;
  displayName: string;
  phone: string;
  affiliateCode: string;
  commissionRate: number; // e.g. 20%
  balanceAvailable: number;
  balancePending: number;
  totalEarned: number;
  bankName: string;
  bankAccountNumber: string;
  bankAccountName: string;
  clicksCount: number;
  ordersCount: number;
  role: 'affiliate' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface AffiliateOrderRecord {
  id?: string;
  affiliateUid: string;
  affiliateCode: string;
  customerName: string;
  customerPhone: string;
  planName: string;
  orderAmount: number;
  commissionAmount: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface WithdrawalRequestRecord {
  id?: string;
  affiliateUid: string;
  affiliateEmail: string;
  affiliateCode: string;
  amount: number;
  bankName: string;
  bankAccountNumber: string;
  bankAccountName: string;
  status: 'pending' | 'completed' | 'rejected';
  note?: string;
  createdAt: string;
  processedAt?: string;
}

const LOCAL_STORAGE_REF_KEY = 'vua_capcut_ref_code';
const LOCAL_STORAGE_CLICKED_KEY = 'vua_capcut_ref_clicked_timestamp';

// Track referral link click and increment click count in Firestore
export async function trackReferralVisit(code: string): Promise<boolean> {
  const cleanCode = code.trim().toUpperCase();
  if (!cleanCode) return false;

  try {
    // Save to local storage
    localStorage.setItem(LOCAL_STORAGE_REF_KEY, cleanCode);

    // Prevent spamming clicks from same browser within 1 hour
    const lastClick = localStorage.getItem(`${LOCAL_STORAGE_CLICKED_KEY}_${cleanCode}`);
    const now = Date.now();
    if (lastClick && now - parseInt(lastClick, 10) < 60 * 60 * 1000) {
      return true; // Already tracked recently
    }

    // Find affiliate with this code
    const q = query(
      collection(db, 'affiliates'), 
      where('affiliateCode', '==', cleanCode),
      limit(1)
    );
    const snap = await getDocs(q);

    if (!snap.empty) {
      const affiliateDoc = snap.docs[0];
      await updateDoc(doc(db, 'affiliates', affiliateDoc.id), {
        clicksCount: increment(1),
        updatedAt: new Date().toISOString()
      });
      localStorage.setItem(`${LOCAL_STORAGE_CLICKED_KEY}_${cleanCode}`, now.toString());
      return true;
    }
  } catch (err) {
    console.warn('Error tracking referral visit:', err);
  }
  return false;
}

// Get active referral code from URL or local storage
export function getStoredReferralCode(): string | null {
  if (typeof window === 'undefined') return null;
  
  // Check URL search params first (?ref=... or ?aff=...)
  const params = new URLSearchParams(window.location.search);
  const urlRef = params.get('ref') || params.get('aff');
  if (urlRef) {
    const clean = urlRef.trim().toUpperCase();
    localStorage.setItem(LOCAL_STORAGE_REF_KEY, clean);
    return clean;
  }

  return localStorage.getItem(LOCAL_STORAGE_REF_KEY);
}

// Register new Affiliate with Email/Password
export async function registerAffiliateAccount(
  email: string, 
  pass: string, 
  displayName: string, 
  phone: string, 
  customCode?: string
): Promise<AffiliateProfile> {
  // Generate or sanitize code
  let affiliateCode = (customCode || displayName.replace(/[^a-zA-Z0-9]/g, '').slice(0, 8) || 'CTV' + Math.floor(1000 + Math.random() * 9000))
    .toUpperCase().replace(/\s+/g, '');
  
  if (affiliateCode.length < 3) {
    affiliateCode = 'CTV' + Math.floor(1000 + Math.random() * 9000);
  }

  // Check code uniqueness
  const q = query(collection(db, 'affiliates'), where('affiliateCode', '==', affiliateCode), limit(1));
  const existing = await getDocs(q);
  if (!existing.empty) {
    affiliateCode = affiliateCode + Math.floor(10 + Math.random() * 89);
  }

  const credential = await createUserWithEmailAndPassword(auth, email, pass);
  const uid = credential.user.uid;

  const newProfile: AffiliateProfile = {
    uid,
    email,
    displayName: displayName || email.split('@')[0],
    phone,
    affiliateCode,
    commissionRate: 18, // 18% standard starting commission (range 18% - 24%)
    balanceAvailable: 0,
    balancePending: 0,
    totalEarned: 0,
    bankName: '',
    bankAccountNumber: '',
    bankAccountName: '',
    clicksCount: 0,
    ordersCount: 0,
    role: email.toLowerCase() === 'marketingaimaster@gmail.com' ? 'admin' : 'affiliate',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  await setDoc(doc(db, 'affiliates', uid), newProfile);
  return newProfile;
}

// Sign in with Google
export async function signInWithGoogleAccount(): Promise<AffiliateProfile> {
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;
  
  const profileSnap = await getDoc(doc(db, 'affiliates', user.uid));
  if (profileSnap.exists()) {
    return profileSnap.data() as AffiliateProfile;
  }

  // Create new profile for first-time Google sign-in
  const rawName = (user.displayName || user.email?.split('@')[0] || 'CTV').replace(/[^a-zA-Z0-9]/g, '').slice(0, 6).toUpperCase();
  const affiliateCode = rawName + Math.floor(100 + Math.random() * 900);

  const newProfile: AffiliateProfile = {
    uid: user.uid,
    email: user.email || '',
    displayName: user.displayName || 'Cộng Tác Viên',
    phone: '',
    affiliateCode,
    commissionRate: 18, // 18% standard starting commission
    balanceAvailable: 0,
    balancePending: 0,
    totalEarned: 0,
    bankName: '',
    bankAccountNumber: '',
    bankAccountName: '',
    clicksCount: 0,
    ordersCount: 0,
    role: user.email?.toLowerCase() === 'marketingaimaster@gmail.com' ? 'admin' : 'affiliate',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  await setDoc(doc(db, 'affiliates', user.uid), newProfile);
  return newProfile;
}

// Record order attributed to affiliate
export async function recordReferralOrder(
  customerName: string,
  customerPhone: string,
  planName: string,
  priceStr: string,
  refCode?: string
): Promise<string | null> {
  const targetCode = (refCode || getStoredReferralCode())?.trim().toUpperCase();
  if (!targetCode) return null;

  try {
    const q = query(
      collection(db, 'affiliates'),
      where('affiliateCode', '==', targetCode),
      limit(1)
    );
    const snap = await getDocs(q);
    if (snap.empty) return null;

    const affiliateDoc = snap.docs[0];
    const affiliate = affiliateDoc.data() as AffiliateProfile;

    // Parse price e.g. "199.000đ" -> 199000
    const numericAmount = parseInt(priceStr.replace(/[^0-9]/g, ''), 10) || 199000;
    const rate = affiliate.commissionRate || 18;
    const commission = Math.round((numericAmount * rate) / 100);

    const orderData: AffiliateOrderRecord = {
      affiliateUid: affiliate.uid,
      affiliateCode: targetCode,
      customerName: customerName || 'Khách vãng lai',
      customerPhone: customerPhone || '',
      planName,
      orderAmount: numericAmount,
      commissionAmount: commission,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    const docRef = await addDoc(collection(db, 'affiliate_orders'), orderData);

    // Update pending balance and ordersCount on affiliate
    await updateDoc(doc(db, 'affiliates', affiliateDoc.id), {
      balancePending: increment(commission),
      ordersCount: increment(1),
      updatedAt: new Date().toISOString()
    });

    return docRef.id;
  } catch (err) {
    console.warn('Error recording referral order:', err);
    return null;
  }
}

// Request payout / withdrawal
export async function submitWithdrawalRequest(
  profile: AffiliateProfile,
  amount: number,
  bankName: string,
  bankAccountNumber: string,
  bankAccountName: string
): Promise<{ success: boolean; message: string }> {
  if (amount < 100000) {
    return { success: false, message: 'Số tiền rút tối thiểu là 100.000đ' };
  }
  if (amount > profile.balanceAvailable) {
    return { success: false, message: 'Số dư khả dụng trong ví không đủ' };
  }
  if (!bankName || !bankAccountNumber || !bankAccountName) {
    return { success: false, message: 'Vui lòng điền đầy đủ thông tin tài khoản ngân hàng' };
  }

  try {
    const withdrawal: WithdrawalRequestRecord = {
      affiliateUid: profile.uid,
      affiliateEmail: profile.email,
      affiliateCode: profile.affiliateCode,
      amount,
      bankName,
      bankAccountNumber,
      bankAccountName: bankAccountName.toUpperCase(),
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    await addDoc(collection(db, 'withdrawal_requests'), withdrawal);

    // Deduct available balance
    await updateDoc(doc(db, 'affiliates', profile.uid), {
      balanceAvailable: increment(-amount),
      bankName,
      bankAccountNumber,
      bankAccountName: bankAccountName.toUpperCase(),
      updatedAt: new Date().toISOString()
    });

    return { success: true, message: 'Gửi yêu cầu rút tiền thành công! Tiền sẽ về tài khoản trong 2-12 giờ.' };
  } catch (err: any) {
    return { success: false, message: err.message || 'Lỗi khi gửi yêu cầu' };
  }
}

// ----------------- ADMIN MANAGEMENT SERVICES -----------------

// Fetch all affiliates (for admin)
export async function getAllAffiliatesList(): Promise<AffiliateProfile[]> {
  const snap = await getDocs(collection(db, 'affiliates'));
  const list: AffiliateProfile[] = [];
  snap.forEach(d => list.push({ uid: d.id, ...d.data() } as AffiliateProfile));
  return list;
}

// Fetch all orders (for admin)
export async function getAllOrdersList(): Promise<AffiliateOrderRecord[]> {
  const q = query(collection(db, 'affiliate_orders'), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  const list: AffiliateOrderRecord[] = [];
  snap.forEach(d => list.push({ id: d.id, ...d.data() } as AffiliateOrderRecord));
  return list;
}

// Fetch all withdrawals (for admin)
export async function getAllWithdrawalsList(): Promise<WithdrawalRequestRecord[]> {
  const q = query(collection(db, 'withdrawal_requests'), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  const list: WithdrawalRequestRecord[] = [];
  snap.forEach(d => list.push({ id: d.id, ...d.data() } as WithdrawalRequestRecord));
  return list;
}

// Admin: Approve referral order (moves pending commission to available wallet)
export async function approveAffiliateOrder(
  orderId: string, 
  affiliateUid: string, 
  commissionAmount: number
): Promise<boolean> {
  try {
    await updateDoc(doc(db, 'affiliate_orders', orderId), {
      status: 'approved',
      approvedAt: new Date().toISOString()
    });

    await updateDoc(doc(db, 'affiliates', affiliateUid), {
      balancePending: increment(-commissionAmount),
      balanceAvailable: increment(commissionAmount),
      totalEarned: increment(commissionAmount),
      updatedAt: new Date().toISOString()
    });
    return true;
  } catch (err) {
    console.error('Error approving order:', err);
    return false;
  }
}

// Admin: Reject referral order
export async function rejectAffiliateOrder(
  orderId: string, 
  affiliateUid: string, 
  commissionAmount: number
): Promise<boolean> {
  try {
    await updateDoc(doc(db, 'affiliate_orders', orderId), {
      status: 'rejected',
      rejectedAt: new Date().toISOString()
    });

    await updateDoc(doc(db, 'affiliates', affiliateUid), {
      balancePending: increment(-commissionAmount),
      ordersCount: increment(-1),
      updatedAt: new Date().toISOString()
    });
    return true;
  } catch (err) {
    console.error('Error rejecting order:', err);
    return false;
  }
}

// Admin: Approve and complete withdrawal payout
export async function approveAffiliateWithdrawal(
  withdrawalId: string,
  note?: string
): Promise<boolean> {
  try {
    await updateDoc(doc(db, 'withdrawal_requests', withdrawalId), {
      status: 'completed',
      note: note || 'Đã chuyển khoản thành công',
      processedAt: new Date().toISOString()
    });
    return true;
  } catch (err) {
    console.error('Error approving withdrawal:', err);
    return false;
  }
}

// Admin: Reject withdrawal (refunds balance back to available)
export async function rejectAffiliateWithdrawal(
  withdrawalId: string,
  affiliateUid: string,
  amount: number,
  reason?: string
): Promise<boolean> {
  try {
    await updateDoc(doc(db, 'withdrawal_requests', withdrawalId), {
      status: 'rejected',
      note: reason || 'Từ chối rút tiền (thông tin tài khoản không hợp lệ)',
      processedAt: new Date().toISOString()
    });

    // Refund to available balance
    await updateDoc(doc(db, 'affiliates', affiliateUid), {
      balanceAvailable: increment(amount),
      updatedAt: new Date().toISOString()
    });
    return true;
  } catch (err) {
    console.error('Error rejecting withdrawal:', err);
    return false;
  }
}

// Admin: Update commission rate for a specific CTV (e.g. raise to 25% or 30%)
export async function updateAffiliateRate(
  affiliateUid: string, 
  newRate: number
): Promise<boolean> {
  try {
    await updateDoc(doc(db, 'affiliates', affiliateUid), {
      commissionRate: newRate,
      updatedAt: new Date().toISOString()
    });
    return true;
  } catch (err) {
    console.error('Error updating commission rate:', err);
    return false;
  }
}

// User / CTV: Update custom affiliate code (Mã Tiếp Thị)
export async function updateAffiliateCode(
  uid: string, 
  newCode: string
): Promise<{ success: boolean; message: string; code?: string }> {
  const cleanCode = newCode.trim().toUpperCase().replace(/[^A-Z0-9_-]/g, '');
  if (cleanCode.length < 3) {
    return { success: false, message: 'Mã CTV tối thiểu 3 ký tự (chữ cái hoặc số)' };
  }
  if (cleanCode.length > 20) {
    return { success: false, message: 'Mã CTV tối đa 20 ký tự' };
  }

  try {
    // Check if another user already has this code
    const q = query(
      collection(db, 'affiliates'),
      where('affiliateCode', '==', cleanCode),
      limit(2)
    );
    const snap = await getDocs(q);
    const conflict = snap.docs.find(d => d.id !== uid);
    if (conflict) {
      return { success: false, message: `Mã "${cleanCode}" đã có người sử dụng. Vui lòng chọn mã khác!` };
    }

    // Update in Firestore
    await updateDoc(doc(db, 'affiliates', uid), {
      affiliateCode: cleanCode,
      updatedAt: new Date().toISOString()
    });

    return { success: true, message: `Đã đổi mã CTV thành "${cleanCode}" thành công!`, code: cleanCode };
  } catch (err: any) {
    return { success: false, message: err.message || 'Lỗi khi cập nhật mã CTV' };
  }
}

