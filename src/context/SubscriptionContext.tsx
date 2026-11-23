import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Subscription } from '../types';

interface SubscriptionContextType {
  subscriptions: Subscription[];

  addSubscription: (sub: Omit<Subscription, 'id'>) => void;
  deleteSubscription: (id: string) => void;
}

const INITIAL_SUBSCRIPTIONS: Subscription[] = [
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
  {
    id: '4',
    name: 'iCloud+',
    amount: 39.99,
    currency: 'TRY',
    billingCycle: 'monthly',
    paymentDay: 1,
    category: 'Yazılım',
  },
];

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);


interface SubscriptionProviderProps {
  children: ReactNode;
}

export const SubscriptionProvider: React.FC<SubscriptionProviderProps> = ({ children }) => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(INITIAL_SUBSCRIPTIONS);


  const addSubscription = (sub: Omit<Subscription, 'id'>): void => {
    const newSubscription: Subscription = {
      ...sub,
      id: Date.now().toString(),
    };
    setSubscriptions((previousSubscriptions) => [newSubscription, ...previousSubscriptions]);
  };

  const deleteSubscription = (id: string): void => {
    setSubscriptions((previousSubscriptions) =>
      previousSubscriptions.filter((subscription) => subscription.id !== id)
    );
  };

  return (
    <SubscriptionContext.Provider value={{ subscriptions, addSubscription, deleteSubscription }}>

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
