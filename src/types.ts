export interface PricingOption {
  duration: string;
  price: string;
  originalPrice?: string;
  savings: string;
  bonus?: string;
  badge?: string;
  note?: string;
}

export interface PricingColumn {
  id: string;
  title: string;
  subtitle: string;
  forWho: string;
  popular?: boolean;
  tag?: string;
  features: string[];
  options: PricingOption[];
}

export interface CustomerReview {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  packageUsed: string;
  comment: string;
  chatSnippet?: {
    time: string;
    message: string;
    reply: string;
  };
  date: string;
  verified: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'bao-hanh' | 'tinh-nang' | 'thanh-toan' | 'thiet-bi';
}

export interface OrderSelection {
  columnTitle: string;
  option: PricingOption;
}
