import React, { useState, useEffect } from 'react';
import { 
  Users, ShoppingBag, CreditCard, DollarSign, CheckCircle, XCircle, 
  Search, Filter, ExternalLink, QrCode, ArrowUpRight, ShieldCheck, 
  TrendingUp, RefreshCw, AlertCircle, Phone, Mail, Award, Lock, Sparkles,
  Copy, Check
} from 'lucide-react';
import { 
  AffiliateProfile, 
  AffiliateOrderRecord, 
  WithdrawalRequestRecord,
  getAllAffiliatesList,
  getAllOrdersList,
  getAllWithdrawalsList,
  approveAffiliateOrder,
  rejectAffiliateOrder,
  approveAffiliateWithdrawal,
  rejectAffiliateWithdrawal,
  updateAffiliateRate
} from '../services/affiliateService';
import { generateVietQrUrl, generateVietQrFallbackUrl, findBank, getBankCode } from '../utils/vietqr';

interface AdminAffiliatePortalProps {
  onClose?: () => void;
}

export const AdminAffiliatePortal: React.FC<AdminAffiliatePortalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'stats' | 'affiliates' | 'orders' | 'withdrawals'>('stats');
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Data states
  const [affiliates, setAffiliates] = useState<AffiliateProfile[]>([]);
  const [orders, setOrders] = useState<AffiliateOrderRecord[]>([]);
  const [withdrawals, setWithdrawals] = useState<WithdrawalRequestRecord[]>([]);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [orderFilter, setOrderFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [withdrawalFilter, setWithdrawalFilter] = useState<'all' | 'pending' | 'completed' | 'rejected'>('all');

  // QR Modal for payout
  const [selectedPayout, setSelectedPayout] = useState<WithdrawalRequestRecord | null>(null);

  const loadAllData = async () => {
    setRefreshing(true);
    try {
      const [affList, orderList, withList] = await Promise.all([
        getAllAffiliatesList(),
        getAllOrdersList(),
        getAllWithdrawalsList()
      ]);
      setAffiliates(affList);
      setOrders(orderList);
      setWithdrawals(withList);
    } catch (err: any) {
      console.error(err);
      setMessage({ text: 'Lỗi tải dữ liệu quản trị: ' + (err.message || ''), type: 'error' });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const showToast = (text: string, type: 'success' | 'error') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 4000);
  };

  // Actions
  const handleApproveOrder = async (order: AffiliateOrderRecord) => {
    if (!order.id) return;
    if (!window.confirm(`Xác nhận duyệt đơn hàng cho CTV ${order.affiliateCode}? (+${order.commissionAmount.toLocaleString('vi-VN')}đ vào ví)`)) {
      return;
    }
    const success = await approveAffiliateOrder(order.id, order.affiliateUid, order.commissionAmount);
    if (success) {
      showToast(`Đã duyệt đơn và cộng ${order.commissionAmount.toLocaleString('vi-VN')}đ cho CTV!`, 'success');
      loadAllData();
    } else {
      showToast('Có lỗi xảy ra khi duyệt đơn.', 'error');
    }
  };

  const handleRejectOrder = async (order: AffiliateOrderRecord) => {
    if (!order.id) return;
    if (!window.confirm(`Xác nhận hủy đơn hàng này?`)) return;
    const success = await rejectAffiliateOrder(order.id, order.affiliateUid, order.commissionAmount);
    if (success) {
      showToast('Đã hủy đơn hàng giới thiệu.', 'success');
      loadAllData();
    } else {
      showToast('Có lỗi khi hủy đơn.', 'error');
    }
  };

  const handleApproveWithdrawal = async (req: WithdrawalRequestRecord) => {
    if (!req.id) return;
    if (!window.confirm(`Xác nhận bạn ĐÃ CHUYỂN KHOẢN ${req.amount.toLocaleString('vi-VN')}đ cho CTV ${req.bankAccountName}?`)) {
      return;
    }
    const success = await approveAffiliateWithdrawal(req.id, 'Đã chuyển khoản qua ngân hàng');
    if (success) {
      showToast(`Xác nhận thanh toán thành công cho ${req.bankAccountName}!`, 'success');
      setSelectedPayout(null);
      loadAllData();
    } else {
      showToast('Có lỗi khi duyệt lệnh rút tiền.', 'error');
    }
  };

  const handleRejectWithdrawal = async (req: WithdrawalRequestRecord) => {
    if (!req.id) return;
    const reason = window.prompt('Nhập lý do từ chối rút tiền (tiền sẽ được hoàn trả lại ví CTV):', 'Thông tin số tài khoản hoặc ngân hàng không đúng');
    if (reason === null) return;
    const success = await rejectAffiliateWithdrawal(req.id, req.affiliateUid, req.amount, reason);
    if (success) {
      showToast('Đã từ chối lệnh rút tiền và hoàn tiền vào ví CTV.', 'success');
      loadAllData();
    } else {
      showToast('Có lỗi khi từ chối lệnh.', 'error');
    }
  };

  const handleUpdateCommissionRate = async (affiliateUid: string, currentRate: number) => {
    const newRateStr = window.prompt(`Nhập tỷ lệ hoa hồng mới cho CTV (%):`, currentRate.toString());
    if (!newRateStr) return;
    const newRate = parseInt(newRateStr, 10);
    if (isNaN(newRate) || newRate < 1 || newRate > 90) {
      alert('Vui lòng nhập tỷ lệ hợp lệ từ 1% đến 90%');
      return;
    }
    const success = await updateAffiliateRate(affiliateUid, newRate);
    if (success) {
      showToast(`Đã cập nhật mức hoa hồng thành ${newRate}%!`, 'success');
      loadAllData();
    }
  };

  // Calculations
  const totalRevenue = orders.filter(o => o.status === 'approved').reduce((acc, o) => acc + (o.orderAmount || 0), 0);
  const totalCommissionPaid = orders.filter(o => o.status === 'approved').reduce((acc, o) => acc + (o.commissionAmount || 0), 0);
  const totalPendingPayout = withdrawals.filter(w => w.status === 'pending').reduce((acc, w) => acc + (w.amount || 0), 0);
  const pendingOrdersCount = orders.filter(o => o.status === 'pending').length;
  const pendingWithdrawalsCount = withdrawals.filter(w => w.status === 'pending').length;

  // Filtered lists
  const filteredAffiliates = affiliates.filter(a => 
    a.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.affiliateCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (a.phone && a.phone.includes(searchQuery))
  );

  const filteredOrders = orders.filter(o => {
    const matchSearch = (o.customerName + o.customerPhone + o.affiliateCode + o.planName).toLowerCase().includes(searchQuery.toLowerCase());
    if (orderFilter === 'all') return matchSearch;
    return matchSearch && o.status === orderFilter;
  });

  const filteredWithdrawals = withdrawals.filter(w => {
    const matchSearch = (w.affiliateCode + w.bankName + w.bankAccountNumber + w.bankAccountName + w.affiliateEmail).toLowerCase().includes(searchQuery.toLowerCase());
    if (withdrawalFilter === 'all') return matchSearch;
    return matchSearch && w.status === withdrawalFilter;
  });

  return (
    <div className="space-y-6">
      {/* Toast message */}
      {message && (
        <div className={`p-3.5 rounded-2xl flex items-center gap-2 text-xs font-medium border ${
          message.type === 'success' 
            ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200' 
            : 'bg-rose-950/80 border-rose-500/50 text-rose-200'
        }`}>
          {message.type === 'success' ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <AlertCircle className="w-4 h-4 text-rose-400" />}
          <span>{message.text}</span>
        </div>
      )}

      {/* Admin Sub Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-purple-950/50 p-2.5 rounded-2xl border border-purple-800/60">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab('stats')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'stats'
                ? 'bg-amber-400 text-purple-950 shadow-md'
                : 'text-purple-300 hover:text-white bg-purple-900/40'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Thống Kê Doanh Thu</span>
          </button>
          
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 relative ${
              activeTab === 'orders'
                ? 'bg-amber-400 text-purple-950 shadow-md'
                : 'text-purple-300 hover:text-white bg-purple-900/40'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Duyệt Đơn Hàng</span>
            {pendingOrdersCount > 0 && (
              <span className="bg-rose-500 text-white text-[10px] px-1.5 py-0.2 rounded-full font-black">
                {pendingOrdersCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('withdrawals')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 relative ${
              activeTab === 'withdrawals'
                ? 'bg-amber-400 text-purple-950 shadow-md'
                : 'text-purple-300 hover:text-white bg-purple-900/40'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Duyệt Lệnh Rút Tiền</span>
            {pendingWithdrawalsCount > 0 && (
              <span className="bg-amber-400 text-purple-950 text-[10px] px-1.5 py-0.2 rounded-full font-black animate-pulse">
                {pendingWithdrawalsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('affiliates')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'affiliates'
                ? 'bg-amber-400 text-purple-950 shadow-md'
                : 'text-purple-300 hover:text-white bg-purple-900/40'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Danh Sách CTV ({affiliates.length})</span>
          </button>
        </div>

        <button
          onClick={loadAllData}
          disabled={refreshing}
          className="flex items-center gap-1 text-xs text-purple-300 hover:text-amber-300 bg-purple-900/60 hover:bg-purple-900 px-3 py-1.5 rounded-xl border border-purple-700/60 transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
          <span>Làm mới</span>
        </button>
      </div>

      {/* SUBTAB 1: SYSTEM OVERVIEW STATS */}
      {activeTab === 'stats' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-[#150730] border border-purple-800/60 rounded-2xl p-4 shadow-lg">
              <div className="flex items-center justify-between text-purple-300 text-xs mb-1">
                <span>Tổng Số CTV</span>
                <Users className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white">
                {affiliates.length}
              </div>
              <p className="text-[11px] text-purple-300/80 mt-1">Cộng tác viên đang hoạt động</p>
            </div>

            <div className="bg-[#150730] border border-purple-800/60 rounded-2xl p-4 shadow-lg">
              <div className="flex items-center justify-between text-purple-300 text-xs mb-1">
                <span>Doanh Số Qua CTV</span>
                <TrendingUp className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 truncate">
                {totalRevenue.toLocaleString('vi-VN')}đ
              </div>
              <p className="text-[11px] text-purple-300/80 mt-1">{orders.filter(o => o.status === 'approved').length} đơn đã hoàn tất</p>
            </div>

            <div className="bg-[#150730] border border-purple-800/60 rounded-2xl p-4 shadow-lg">
              <div className="flex items-center justify-between text-purple-300 text-xs mb-1">
                <span>Hoa Hồng Đã Chi</span>
                <DollarSign className="w-4 h-4 text-yellow-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-yellow-400 truncate">
                {totalCommissionPaid.toLocaleString('vi-VN')}đ
              </div>
              <p className="text-[11px] text-purple-300/80 mt-1">Chi trả cho các CTV</p>
            </div>

            <div className="bg-gradient-to-br from-purple-950 to-amber-950/60 border border-amber-500/40 rounded-2xl p-4 shadow-lg">
              <div className="flex items-center justify-between text-amber-200 text-xs mb-1">
                <span>Cần Chuyển Khoản</span>
                <CreditCard className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-amber-300 truncate">
                {totalPendingPayout.toLocaleString('vi-VN')}đ
              </div>
              <p className="text-[11px] text-amber-300/80 mt-1">{pendingWithdrawalsCount} yêu cầu đang chờ bạn duyệt</p>
            </div>
          </div>

          {/* Direct Firebase Console Link Box */}
          <div className="bg-gradient-to-r from-purple-950 via-indigo-950 to-purple-950 border border-purple-700/60 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Cơ Sở Dữ Liệu Trực Tiếp (Firebase Cloud Firestore)</span>
              </div>
              <p className="text-xs text-purple-300 mt-1 leading-relaxed">
                Dữ liệu được lưu trữ tự động trên Google Firebase. Bạn có thể truy cập Firebase Console bất kỳ lúc nào để xem trực tiếp, xuất file Excel hoặc sao lưu.
              </p>
              <div className="mt-2 text-[11px] text-purple-400 font-mono">
                Project ID: <span className="text-amber-300">ai-studio-applet-webapp-a4c94</span> • Database: <span className="text-amber-300">ai-studio-vuacapcutpronngc-4bfe6e62-94fd-4bfc-8130-fc5347772386</span>
              </div>
            </div>

            <a
              href="https://console.firebase.google.com/project/ai-studio-applet-webapp-a4c94/firestore"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-purple-950 font-black px-4 py-2.5 rounded-xl text-xs transition-all shadow-md"
            >
              <span>MỞ FIREBASE CONSOLE</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}

      {/* SUBTAB 2: ORDER APPROVALS */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-purple-300">Lọc theo:</span>
              {(['all', 'pending', 'approved', 'rejected'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setOrderFilter(tab)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg font-bold transition-all ${
                    orderFilter === tab
                      ? 'bg-amber-400 text-purple-950'
                      : 'bg-purple-950/60 text-purple-300 hover:text-white'
                  }`}
                >
                  {tab === 'all' && 'Tất cả'}
                  {tab === 'pending' && `Chờ duyệt (${orders.filter(o => o.status === 'pending').length})`}
                  {tab === 'approved' && 'Đã duyệt'}
                  {tab === 'rejected' && 'Đã hủy'}
                </button>
              ))}
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-purple-400" />
              <input
                type="text"
                placeholder="Tìm mã ref, tên khách, SĐT..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#12072b] border border-purple-700/60 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400 w-full sm:w-64"
              />
            </div>
          </div>

          {filteredOrders.length === 0 ? (
            <div className="bg-purple-950/30 border border-purple-800/40 rounded-2xl p-8 text-center text-xs text-purple-300">
              Không tìm thấy đơn hàng nào.
            </div>
          ) : (
            <div className="overflow-x-auto bg-[#14062c] rounded-2xl border border-purple-800/60">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-purple-800/60 text-purple-300 bg-purple-950/40">
                    <th className="py-3 px-3">Thời gian</th>
                    <th className="py-3 px-3">Mã CTV</th>
                    <th className="py-3 px-3">Khách hàng</th>
                    <th className="py-3 px-3">Gói mua</th>
                    <th className="py-3 px-3">Giá trị</th>
                    <th className="py-3 px-3">Hoa hồng</th>
                    <th className="py-3 px-3">Trạng thái</th>
                    <th className="py-3 px-3 text-right">Thao tác duyệt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-purple-900/40 text-purple-200">
                  {filteredOrders.map((o) => (
                    <tr key={o.id || o.createdAt} className="hover:bg-purple-900/20">
                      <td className="py-3 px-3 text-purple-400">
                        {new Date(o.createdAt).toLocaleString('vi-VN')}
                      </td>
                      <td className="py-3 px-3 font-mono font-bold text-amber-400">
                        {o.affiliateCode}
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-semibold text-white">{o.customerName}</div>
                        <div className="text-[11px] text-purple-300">{o.customerPhone}</div>
                      </td>
                      <td className="py-3 px-3 text-purple-200">{o.planName}</td>
                      <td className="py-3 px-3 font-mono font-bold">
                        {o.orderAmount.toLocaleString('vi-VN')}đ
                      </td>
                      <td className="py-3 px-3 font-mono font-bold text-emerald-400">
                        +{o.commissionAmount.toLocaleString('vi-VN')}đ
                      </td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          o.status === 'approved' 
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                            : o.status === 'rejected'
                            ? 'bg-rose-950 text-rose-300 border border-rose-500/40'
                            : 'bg-amber-950 text-amber-300 border border-amber-500/40'
                        }`}>
                          {o.status === 'approved' ? 'Đã cộng ví CTV' : o.status === 'rejected' ? 'Đã hủy' : 'Chờ bạn duyệt'}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        {o.status === 'pending' ? (
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleApproveOrder(o)}
                              className="bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-1 rounded-lg font-bold text-[11px] shadow-sm transition-colors flex items-center gap-1"
                            >
                              <CheckCircle className="w-3 h-3" />
                              <span>Duyệt</span>
                            </button>
                            <button
                              onClick={() => handleRejectOrder(o)}
                              className="bg-rose-900/60 hover:bg-rose-800 text-rose-200 px-2 py-1 rounded-lg font-medium text-[11px] transition-colors"
                            >
                              Hủy
                            </button>
                          </div>
                        ) : (
                          <span className="text-[11px] text-purple-400">Đã xử lý</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* SUBTAB 3: PAYOUT & WITHDRAWAL REQUESTS */}
      {activeTab === 'withdrawals' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-purple-300">Lọc theo:</span>
              {(['all', 'pending', 'completed', 'rejected'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setWithdrawalFilter(tab)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg font-bold transition-all ${
                    withdrawalFilter === tab
                      ? 'bg-amber-400 text-purple-950'
                      : 'bg-purple-950/60 text-purple-300 hover:text-white'
                  }`}
                >
                  {tab === 'all' && 'Tất cả'}
                  {tab === 'pending' && `Chờ chuyển (${withdrawals.filter(w => w.status === 'pending').length})`}
                  {tab === 'completed' && 'Đã thanh toán'}
                  {tab === 'rejected' && 'Từ chối'}
                </button>
              ))}
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-purple-400" />
              <input
                type="text"
                placeholder="Tìm STK, tên CTV, ngân hàng..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#12072b] border border-purple-700/60 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400 w-full sm:w-64"
              />
            </div>
          </div>

          {filteredWithdrawals.length === 0 ? (
            <div className="bg-purple-950/30 border border-purple-800/40 rounded-2xl p-8 text-center text-xs text-purple-300">
              Chưa có yêu cầu rút tiền nào.
            </div>
          ) : (
            <div className="overflow-x-auto bg-[#14062c] rounded-2xl border border-purple-800/60">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-purple-800/60 text-purple-300 bg-purple-950/40">
                    <th className="py-3 px-3">Thời gian</th>
                    <th className="py-3 px-3">Mã CTV</th>
                    <th className="py-3 px-3">Số tiền rút</th>
                    <th className="py-3 px-3">Ngân hàng</th>
                    <th className="py-3 px-3">Số tài khoản & Tên chủ thẻ</th>
                    <th className="py-3 px-3">Trạng thái</th>
                    <th className="py-3 px-3 text-right">Quét QR & Chuyển tiền</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-purple-900/40 text-purple-200">
                  {filteredWithdrawals.map((w) => (
                    <tr key={w.id || w.createdAt} className="hover:bg-purple-900/20">
                      <td className="py-3 px-3 text-purple-400">
                        {new Date(w.createdAt).toLocaleString('vi-VN')}
                      </td>
                      <td className="py-3 px-3 font-mono font-bold text-amber-400">
                        {w.affiliateCode}
                      </td>
                      <td className="py-3 px-3 font-mono font-black text-yellow-400 text-sm">
                        {w.amount.toLocaleString('vi-VN')}đ
                      </td>
                      <td className="py-3 px-3 font-semibold text-white">
                        {w.bankName}
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-mono text-white text-xs select-all">{w.bankAccountNumber}</div>
                        <div className="text-[10px] text-amber-300 uppercase font-bold">{w.bankAccountName}</div>
                      </td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          w.status === 'completed' 
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                            : w.status === 'rejected'
                            ? 'bg-rose-950 text-rose-300 border border-rose-500/40'
                            : 'bg-amber-950 text-amber-300 border border-amber-500/40'
                        }`}>
                          {w.status === 'completed' ? 'Đã Chuyển Khoản' : w.status === 'rejected' ? 'Từ chối' : 'Chờ bạn chuyển tiền'}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        {w.status === 'pending' ? (
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setSelectedPayout(w)}
                              className="bg-indigo-600 hover:bg-indigo-500 text-white px-2.5 py-1 rounded-lg font-bold text-[11px] shadow-sm flex items-center gap-1"
                            >
                              <QrCode className="w-3.5 h-3.5" />
                              <span>Quét QR Chuyển</span>
                            </button>
                            <button
                              onClick={() => handleApproveWithdrawal(w)}
                              className="bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-1 rounded-lg font-bold text-[11px] transition-colors"
                            >
                              Xong
                            </button>
                            <button
                              onClick={() => handleRejectWithdrawal(w)}
                              className="bg-rose-900/60 hover:bg-rose-800 text-rose-200 px-2 py-1 rounded-lg text-[11px]"
                            >
                              Hủy
                            </button>
                          </div>
                        ) : (
                          <span className="text-[11px] text-purple-400">
                            {w.status === 'completed' ? '✓ Đã thanh toán' : 'Đã hủy'}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* SUBTAB 4: AFFILIATES LIST */}
      {activeTab === 'affiliates' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <span className="text-xs text-purple-300">
              Tổng số CTV: <strong className="text-white">{filteredAffiliates.length} người</strong>
            </span>
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-purple-400" />
              <input
                type="text"
                placeholder="Tìm theo tên, email, mã ref..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#12072b] border border-purple-700/60 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400 w-full sm:w-64"
              />
            </div>
          </div>

          <div className="overflow-x-auto bg-[#14062c] rounded-2xl border border-purple-800/60">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-purple-800/60 text-purple-300 bg-purple-950/40">
                  <th className="py-3 px-3">Cộng tác viên</th>
                  <th className="py-3 px-3">Mã Tiếp Thị</th>
                  <th className="py-3 px-3">Hoa hồng (%)</th>
                  <th className="py-3 px-3">Clicks / Đơn</th>
                  <th className="py-3 px-3">Ví Khả Dụng</th>
                  <th className="py-3 px-3">Chờ Duyệt</th>
                  <th className="py-3 px-3">Tổng Đã Kiếm</th>
                  <th className="py-3 px-3 text-right">Liên hệ / Đổi %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-900/40 text-purple-200">
                {filteredAffiliates.map((a) => (
                  <tr key={a.uid} className="hover:bg-purple-900/20">
                    <td className="py-3 px-3">
                      <div className="font-semibold text-white">{a.displayName}</div>
                      <div className="text-[11px] text-purple-300">{a.email}</div>
                      {a.phone && (
                        <div className="text-[10px] text-emerald-400">Zalo: {a.phone}</div>
                      )}
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-amber-400">
                      {a.affiliateCode}
                    </td>
                    <td className="py-3 px-3">
                      <span className="bg-purple-900 text-amber-300 font-bold px-2 py-0.5 rounded border border-purple-700">
                        {a.commissionRate || 18}%
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-bold text-white">{a.clicksCount || 0}</span> clicks / <span className="font-bold text-emerald-400">{a.ordersCount || 0}</span> đơn
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-yellow-400">
                      {(a.balanceAvailable || 0).toLocaleString('vi-VN')}đ
                    </td>
                    <td className="py-3 px-3 font-mono text-purple-300">
                      {(a.balancePending || 0).toLocaleString('vi-VN')}đ
                    </td>
                    <td className="py-3 px-3 font-mono text-emerald-400 font-bold">
                      {(a.totalEarned || 0).toLocaleString('vi-VN')}đ
                    </td>
                    <td className="py-3 px-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {a.phone && (
                          <a
                            href={`https://zalo.me/${a.phone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-blue-600 hover:bg-blue-500 text-white px-2 py-1 rounded-lg text-[10px] font-bold"
                          >
                            Zalo
                          </a>
                        )}
                        <button
                          onClick={() => handleUpdateCommissionRate(a.uid, a.commissionRate || 18)}
                          className="bg-purple-900/80 hover:bg-purple-800 text-purple-200 border border-purple-700 px-2 py-1 rounded-lg text-[10px] font-semibold"
                        >
                          Đổi %
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* POPUP VIETQR CODE FOR INSTANT BANK TRANSFER */}
      {selectedPayout && (() => {
        const vietQrUrl = generateVietQrUrl(
          selectedPayout.bankName,
          selectedPayout.bankAccountNumber,
          selectedPayout.amount,
          selectedPayout.bankAccountName,
          `VuaCapcut ${selectedPayout.affiliateCode}`
        );

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
            <div className="bg-[#12072b] border-2 border-amber-500 rounded-3xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl relative max-h-[95vh] overflow-y-auto">
              <button
                onClick={() => setSelectedPayout(null)}
                className="absolute top-4 right-4 text-purple-300 hover:text-white p-1.5 rounded-full bg-purple-950 border border-purple-800"
              >
                ✕
              </button>

              <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-yellow-300 text-purple-950 font-black text-xs px-3.5 py-1.5 rounded-full uppercase shadow-md">
                <QrCode className="w-4 h-4" />
                <span>VietQR Napas247 Chuyển Tiền Tự Động</span>
              </div>

              <div>
                <h4 className="text-lg font-black text-white uppercase tracking-wide">
                  {selectedPayout.bankAccountName}
                </h4>
                <div className="flex items-center justify-center gap-2 mt-1">
                  <span className="text-xs text-amber-300 font-semibold">
                    Ngân hàng: {findBank(selectedPayout.bankName).name}
                  </span>
                  <span className="text-[10px] bg-purple-900 text-purple-200 px-2 py-0.5 rounded border border-purple-700 font-mono">
                    BIN: {findBank(selectedPayout.bankName).bin}
                  </span>
                </div>
              </div>

              <div className="bg-purple-950/60 border border-purple-800/80 rounded-2xl p-3 text-xs space-y-2 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-purple-300">Số tài khoản:</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-amber-300 font-mono font-bold text-sm select-all">{selectedPayout.bankAccountNumber}</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(selectedPayout.bankAccountNumber);
                        showToast('Đã sao chép Số Tài Khoản!', 'success');
                      }}
                      className="p-1 hover:bg-purple-800 rounded text-purple-300 hover:text-white"
                      title="Sao chép STK"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-purple-300">Số tiền cần chuyển:</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-yellow-400 font-mono font-black text-base">{selectedPayout.amount.toLocaleString('vi-VN')} VND</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(selectedPayout.amount.toString());
                        showToast('Đã sao chép Số Tiền!', 'success');
                      }}
                      className="p-1 hover:bg-purple-800 rounded text-purple-300 hover:text-white"
                      title="Sao chép Số tiền"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-purple-300">Nội dung chuyển:</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-white font-mono select-all">VuaCapcut {selectedPayout.affiliateCode}</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(`VuaCapcut ${selectedPayout.affiliateCode}`);
                        showToast('Đã sao chép Nội dung chuyển tiền!', 'success');
                      }}
                      className="p-1 hover:bg-purple-800 rounded text-purple-300 hover:text-white"
                      title="Sao chép nội dung"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Official VietQR Standard Image */}
              <div className="bg-white p-3 rounded-2xl mx-auto w-64 h-auto shadow-2xl flex flex-col items-center justify-center">
                <img
                  src={vietQrUrl}
                  alt={`VietQR Napas247 - ${selectedPayout.bankName}`}
                  className="w-full h-auto object-contain rounded-xl"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (!target.src.includes('qr_only')) {
                      target.src = generateVietQrFallbackUrl(
                        selectedPayout.bankName,
                        selectedPayout.bankAccountNumber,
                        selectedPayout.amount,
                        `VuaCapcut ${selectedPayout.affiliateCode}`
                      );
                    }
                  }}
                />
              </div>

              <p className="text-[11px] text-purple-300 leading-relaxed">
                📱 Mở bất kỳ app ngân hàng nào (VCB, MB, Techcom, BIDV...) quét mã QR trên là tự động điền STK, Tên và đúng {selectedPayout.amount.toLocaleString('vi-VN')}đ.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <a
                  href={vietQrUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-purple-900/80 hover:bg-purple-800 text-purple-200 text-xs font-semibold border border-purple-700 transition-colors flex items-center justify-center gap-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Mở ảnh QR tab mới</span>
                </a>
                <button
                  onClick={() => handleApproveWithdrawal(selectedPayout)}
                  className="flex-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black py-2.5 rounded-xl text-xs shadow-lg shadow-emerald-500/20 cursor-pointer"
                >
                  Xác Nhận Đã Chuyển Tiền Cho CTV
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};
