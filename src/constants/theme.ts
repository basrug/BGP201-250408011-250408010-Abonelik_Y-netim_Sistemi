export interface ThemeColors {
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  primary: string;
  error: string;
  border: string;
  success: string;
  card: string;
}

export const LIGHT_COLORS: ThemeColors = {
  background: '#F8F9FA',
  surface: '#FFFFFF',
  text: '#1A1D20',
  textSecondary: '#6C757D',
  primary: '#4361EE',
  error: '#E63946',
  border: '#E0E0E0',
  success: '#2EC4B6',
  card: '#FFFFFF',
};

export const DARK_COLORS: ThemeColors = {
  background: '#121212',
  surface: '#1E1E1E',
  text: '#F8F9FA',
  textSecondary: '#A0A0A0',
  primary: '#4CC9F0',
  error: '#EF4444',
  border: '#2C2C2C',
  success: '#2EC4B6',
  card: '#1E1E1E',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  title: 28,
} as const;

export const CURRENCY_OPTIONS = ['TRY', 'USD', 'EUR'] as const;

export const BILLING_CYCLE_OPTIONS = [
  { label: 'Aylık', value: 'monthly' },
  { label: 'Yıllık', value: 'yearly' },
] as const;

export const CATEGORY_OPTIONS = [
  'Eğlence',
  'Yazılım',
  'Fatura',
  'Eğitim',
  'Diğer',
] as const;
