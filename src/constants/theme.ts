export interface ThemeColors {
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  primary: string;
  error: string;

  success: string;
  border: string;
  card: string;
  buttonText: string;
}

export const LIGHT_THEME: ThemeColors = {

  background: '#F8F9FA',
  surface: '#FFFFFF',
  text: '#1A1D20',
  textSecondary: '#6C757D',
  primary: '#4361EE',
  error: '#E63946',

  success: '#2A9D8F',
  border: '#E9ECEF',
  card: '#FFFFFF',
  buttonText: '#FFFFFF',
};

export const DARK_THEME: ThemeColors = {
  background: '#121212',
  surface: '#1E1E1E',
  text: '#F8F9FA',
  textSecondary: '#A0AAB2',
  primary: '#4895EF',
  error: '#FF6B6B',
  success: '#4EBAAA',
  border: '#2C2C2C',
  card: '#1E1E1E',
  buttonText: '#FFFFFF',

};

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
