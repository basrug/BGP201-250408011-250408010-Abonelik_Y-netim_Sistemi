import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { SPACING, FONT_SIZES } from '../constants/theme';
import { RootStackScreenProps } from '../navigation/types';

export const LoginScreen: React.FC<RootStackScreenProps<'Login'>> = ({ navigation }) => {
  const { theme } = useTheme();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = (): void => {
    navigation.replace('MainTabs');
  };

  const handleNavigateRegister = (): void => {
    navigation.navigate('Register');
  };

  const dynamicStyles = {
    container: {
      backgroundColor: theme.background,
    },
    title: {
      color: theme.primary,
    },
    subtitle: {
      color: theme.textSecondary,
    },
    card: {
      backgroundColor: theme.surface,
      borderColor: theme.border,
    },
    label: {
      color: theme.text,
    },
    input: {
      backgroundColor: theme.background,
      borderColor: theme.border,
      color: theme.text,
    },
    loginButton: {
      backgroundColor: theme.primary,
    },
    loginButtonText: {
      color: theme.buttonText,
    },
    demoButton: {
      borderColor: theme.primary,
    },
    demoButtonText: {
      color: theme.primary,
    },
    registerText: {
      color: theme.textSecondary,
    },
    registerLinkText: {
      color: theme.primary,
    },
  };

  return (
    <KeyboardAvoidingView
      style={[styles.screen, dynamicStyles.container]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.headerContainer}>
          <Text style={[styles.appTitle, dynamicStyles.title]}>Abonelik Sistemi</Text>
          <Text style={[styles.subtitle, dynamicStyles.subtitle]}>
            Tüm aboneliklerinizi tek merkezden takip edin
          </Text>
        </View>

        <View style={[styles.card, dynamicStyles.card]}>
          <View style={styles.fieldGroup}>
            <Text style={[styles.label, dynamicStyles.label]}>E-Posta Adresi</Text>
            <TextInput
              style={[styles.input, dynamicStyles.input]}
              value={email}
              onChangeText={setEmail}
              placeholder="ornek@mail.com"
              placeholderTextColor={theme.textSecondary}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={[styles.label, dynamicStyles.label]}>Şifre</Text>
            <TextInput
              style={[styles.input, dynamicStyles.input]}
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              placeholderTextColor={theme.textSecondary}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            style={[styles.primaryButton, dynamicStyles.loginButton]}
            onPress={handleLogin}
            activeOpacity={0.8}
          >
            <Text style={[styles.primaryButtonText, dynamicStyles.loginButtonText]}>Giriş Yap</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.secondaryButton, dynamicStyles.demoButton]}
            onPress={handleLogin}
            activeOpacity={0.8}
          >
            <Text style={[styles.secondaryButtonText, dynamicStyles.demoButtonText]}>
              Demo Modunda Giriş
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footerContainer}>
          <Text style={[styles.footerText, dynamicStyles.registerText]}>
            Henüz hesabınız yok mu?{' '}
          </Text>
          <TouchableOpacity onPress={handleNavigateRegister}>
            <Text style={[styles.linkText, dynamicStyles.registerLinkText]}>Kayıt Olun</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xl,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  appTitle: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: '700',
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: FONT_SIZES.sm,
    textAlign: 'center',
  },
  card: {
    borderRadius: SPACING.md,
    borderWidth: 1,
    padding: SPACING.lg,
  },
  fieldGroup: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    marginBottom: SPACING.xs,
  },
  input: {
    borderWidth: 1,
    borderRadius: SPACING.sm,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    fontSize: FONT_SIZES.md,
  },
  primaryButton: {
    borderRadius: SPACING.sm,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  primaryButtonText: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
  secondaryButton: {
    borderWidth: 1,
    borderRadius: SPACING.sm,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  secondaryButtonText: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SPACING.lg,
  },
  footerText: {
    fontSize: FONT_SIZES.sm,
  },
  linkText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },
});
