import { Subscription } from '../types';

export const INITIAL_MOCK_SUBSCRIPTIONS: Subscription[] = [
  {
    id: '1',
    name: 'Netflix',
    amount: 149.99,
    currency: 'TRY',
    billingCycle: 'monthly',
    paymentDay: 15,
    category: 'Eğlence',
  },
  {
    id: '2',
    name: 'Spotify',
    amount: 59.99,
    currency: 'TRY',
    billingCycle: 'monthly',
    paymentDay: 22,
    category: 'Eğlence',
  },
  {
    id: '3',
    name: 'GitHub Copilot',
    amount: 10,
    currency: 'USD',
    billingCycle: 'monthly',
    paymentDay: 5,
    category: 'Yazılım',
  },
];

export const fetchSubscriptions = async (): Promise<Subscription[]> => {
  return Promise.resolve(INITIAL_MOCK_SUBSCRIPTIONS);
};

export const createSubscription = async (
  subscription: Omit<Subscription, 'id'>
): Promise<Subscription> => {
  const newSub: Subscription = {
    ...subscription,
    id: Date.now().toString(),
  };
  return Promise.resolve(newSub);
};

export const deleteSubscriptionById = async (id: string): Promise<boolean> => {
  return Promise.resolve(Boolean(id));
};
