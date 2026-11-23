export type Currency = 'TRY' | 'USD' | 'EUR';

export type BillingCycle = 'monthly' | 'yearly';

export type SubscriptionCategory =
  | 'Eğlence'
  | 'Yazılım'
  | 'Fatura'
  | 'Eğitim'
  | 'Diğer';

export interface Subscription {
  id: string;
  name: string;
  amount: number;
  currency: Currency;
  billingCycle: BillingCycle;
  paymentDay: number;
  category: SubscriptionCategory;
}

export interface SubscriptionFormData {
  name: string;
  amount: string;
  currency: Currency;
  billingCycle: BillingCycle;
  paymentDay: string;
  category: SubscriptionCategory;
}
