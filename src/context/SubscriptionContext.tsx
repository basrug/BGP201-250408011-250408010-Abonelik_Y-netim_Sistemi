import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Subscription } from '../types';

interface SubscriptionContextType {
  subscriptions: Subscription[];
  selectedSubscription: Subscription | null;
  addSubscription: (data: Omit<Subscription, 'id'>) => void;
  deleteSubscription: (id: string) => void;
  setSelectedSubscription: (subscription: Subscription | null) => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

const INITIAL_SUBSCRIPTIONS: Subscription[] = [
  {
    id: 'sub-1',
    name: 'Netflix',
    amount: 149.99,
    currency: 'TRY',
    billingCycle: 'monthly',
    paymentDay: 15,
    category: 'Eğlence',
  },
  {
    id: 'sub-2',
    name: 'Spotify',
    amount: 59.99,
    currency: 'TRY',
    billingCycle: 'monthly',
    paymentDay: 5,
    category: 'Eğlence',
  },
  {
    id: 'sub-3',
    name: 'GitHub Copilot',
    amount: 10.0,
    currency: 'USD',
    billingCycle: 'monthly',
    paymentDay: 21,
    category: 'Yazılım',
  },
  {
    id: 'sub-4',
    name: 'Ev İnterneti',
    amount: 320.0,
    currency: 'TRY',
    billingCycle: 'monthly',
    paymentDay: 28,
    category: 'Fatura',
  },
  {
    id: 'sub-5',
    name: 'Coursera Plus',
    amount: 399.0,
    currency: 'USD',
    billingCycle: 'yearly',
    paymentDay: 10,
    category: 'Eğitim',
  },
];

interface SubscriptionProviderProps {
  children: ReactNode;
}

export const SubscriptionProvider: React.FC<SubscriptionProviderProps> = ({ children }) => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(INITIAL_SUBSCRIPTIONS);
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null);

  const addSubscription = (data: Omit<Subscription, 'id'>) => {
    const newSubscription: Subscription = {
      ...data,
      id: `sub-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    };
    setSubscriptions((prev) => [newSubscription, ...prev]);
  };

  const deleteSubscription = (id: string) => {
    setSubscriptions((prev) => prev.filter((sub) => sub.id !== id));
    if (selectedSubscription?.id === id) {
      setSelectedSubscription(null);
    }
  };

  return (
    <SubscriptionContext.Provider
      value={{
        subscriptions,
        selectedSubscription,
        addSubscription,
        deleteSubscription,
        setSelectedSubscription,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscriptions = (): SubscriptionContextType => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscriptions must be used within a SubscriptionProvider');
  }
  return context;
};
