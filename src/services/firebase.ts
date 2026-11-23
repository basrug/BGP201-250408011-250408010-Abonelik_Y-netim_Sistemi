export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

export const FIREBASE_CONFIG: FirebaseConfig = {
  apiKey: 'MOCK_API_KEY_WEEK_9',
  authDomain: 'abonelik-yonetim.firebaseapp.com',
  projectId: 'abonelik-yonetim',
  storageBucket: 'abonelik-yonetim.appspot.com',
  messagingSenderId: '123456789',
  appId: '1:123456789:web:abcdef',
};

export const isFirebaseConfigured = (): boolean => {
  return FIREBASE_CONFIG.apiKey !== 'MOCK_API_KEY_WEEK_9';
};
