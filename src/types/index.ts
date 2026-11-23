export type Currency = 'TRY' | 'USD' | 'EUR';

export type BillingCycle = 'monthly' | 'yearly';

export type SubscriptionCategory = 'Eğlence' | 'Yazılım' | 'Fatura' | 'Eğitim' | 'Diğer';

export interface Subscription {
  id: string;
  name: string;
  amount: number;
  currency: Currency;
  billingCycle: BillingCycle;
  paymentDay: number;
  category: SubscriptionCategory;
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  createdAt: string;
}
