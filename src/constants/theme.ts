export interface ThemeColors {
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  primary: string;
  buttonText: string;
  border: string;
  error: string;
  success: string;
  warning: string;
  card: string;
  inputBackground: string;
}

export type Theme = ThemeColors;

export const LIGHT_COLORS: ThemeColors = {
  background: '#F8F9FA',
  surface: '#FFFFFF',
  text: '#1A1D20',
  textSecondary: '#6C757D',
  primary: '#4361EE',
  buttonText: '#FFFFFF',
  border: '#E9ECEF',
  error: '#E63946',
  success: '#2A9D8F',
  warning: '#F4A261',
  card: '#FFFFFF',
  inputBackground: '#F8F9FA',
};

export const DARK_COLORS: ThemeColors = {
  background: '#121212',
  surface: '#1E1E1E',
  text: '#F8F9FA',
  textSecondary: '#A0AAB2',
  primary: '#4895EF',
  buttonText: '#FFFFFF',
  border: '#2C2C2C',
  error: '#FF6B6B',
  success: '#4EBAAA',
  warning: '#F4A261',
  card: '#1E1E1E',
  inputBackground: '#121212',
};

export const LIGHT_THEME: ThemeColors = LIGHT_COLORS;
export const DARK_THEME: ThemeColors = DARK_COLORS;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
} as const;

export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 30,
} as const;

export const BORDER_RADIUS = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
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
