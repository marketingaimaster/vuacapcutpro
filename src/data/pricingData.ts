import { PricingColumn } from '../types';

export const pricingColumns: PricingColumn[] = [
  {
    id: 'khong-gian',
    title: 'Gói Tối Đa',
    subtitle: 'Mail cấp riêng tư',
    forWho: 'Sử dụng 2 thiết bị (Điện thoại / Máy tính)',
    popular: false,
    tag: 'Gói 2 thiết bị',
    features: [
      'Cấp Email riêng tư 100%',
      'Đăng nhập 2 thiết bị đồng thời',
      'Đăng nhập không mất dữ liệu cũ',
      'Dung lượng 1TB, Credit AI 650/tháng',
      'Full toàn bộ tính năng Pro',
      'Bảo hành, lỗi 1 đổi 1, hỗ trợ 24/7'
    ],
    options: [
      {
        duration: '30 Ngày',
        price: '79.000đ',
        originalPrice: '279.000đ',
        savings: '200k',
      },
      {
        duration: '3 Tháng',
        price: '245.000đ',
        originalPrice: '865.000đ',
        savings: '620k',
      },
      {
        duration: '6 Tháng',
        price: '345.000đ',
        originalPrice: '1.735.000đ',
        savings: '1.390k',
        badge: 'Ưu đãi hot',
      },
      {
        duration: '1 Năm',
        price: '649.000đ',
        originalPrice: '1.939.000đ',
        savings: '1.290k',
        badge: 'Siêu hời',
      },
    ],
  },
  {
    id: 'pho-thong',
    title: 'Gói Phổ Thông',
    subtitle: 'Mail cấp riêng tư',
    forWho: 'Sử dụng 1 thiết bị (Điện thoại / Máy tính)',
    popular: true,
    tag: 'Gói 1 thiết bị',
    features: [
      'Cấp Email riêng tư 100%',
      'Đăng nhập 1 thiết bị ( Điện thoại, Pc, Laptop,...)',
      'Đăng nhập không mất dữ liệu cũ',
      'Dung lượng 1TB, Credit AI 650/tháng',
      'Full toàn bộ tính năng Pro',
      'Bảo hành, lỗi 1 đổi 1, hỗ trợ 24/7'
    ],
    options: [
      {
        duration: '30 Ngày',
        price: '59.000đ',
        originalPrice: '280.000đ',
        savings: '221k',
      },
      {
        duration: '3 Tháng',
        price: '165.000đ',
        originalPrice: '870.000đ',
        savings: '705k',
      },
      {
        duration: '6 Tháng',
        price: '265.000đ',
        originalPrice: '1.740.000đ',
        savings: '1.475k',
        badge: 'Ưu đãi hot',
      },
      {
        duration: '1 Năm',
        price: '465.000đ',
        originalPrice: '1.899.000đ',
        savings: '1.434k',
        badge: 'Siêu hời',
      },
    ],
  },
  {
    id: 'cao-cap',
    title: 'Gói Cao Cấp Mail Chính Chủ',
    subtitle: 'Nâng cấp trực tiếp trên Email Cá Nhân',
    forWho: 'Email cá nhân chính chủ (Dùng 2 thiết bị)',
    popular: false,
    tag: 'Chính Chủ 100%',
    features: [
      'Nâng cấp trực tiếp trên Gmail chính chủ của khách',
      'Đăng nhập 2 thiết bị thoải mái',
      'Đăng nhập không mất dữ liệu cũ',
      'Dung lượng 1TB, Credit AI 650/tháng',
      'Full toàn bộ tính năng Pro',
      'Bảo hành, lỗi 1 đổi 1, hỗ trợ 24/7'
    ],
    options: [
      {
        duration: '30 Ngày',
        price: '129.000đ',
        originalPrice: '289.000đ',
        savings: '160k',
      },
      {
        duration: '3 Tháng',
        price: '299.000đ',
        originalPrice: '869.000đ',
        savings: '570k',
      },
      {
        duration: '6 Tháng',
        price: '499.000đ',
        originalPrice: '1.889.000đ',
        savings: '1.390k',
        badge: 'Ưu đãi hot',
      },
      {
        duration: '1 Năm',
        price: '699.000đ',
        originalPrice: '2.100.000đ',
        savings: '1.401k',
        badge: 'Siêu hời',
      },
    ],
  },
];
