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

export const RegisterScreen: React.FC<RootStackScreenProps<'Register'>> = ({ navigation }) => {
  const { theme } = useTheme();
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const handleRegister = (): void => {
    navigation.replace('MainTabs');
  };

  const handleNavigateLogin = (): void => {
    navigation.navigate('Login');
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
    registerButton: {
      backgroundColor: theme.primary,
    },
    registerButtonText: {
      color: theme.buttonText,
    },
    loginText: {
      color: theme.textSecondary,
    },
    loginLinkText: {
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
          <Text style={[styles.title, dynamicStyles.title]}>Yeni Hesap Oluştur</Text>
          <Text style={[styles.subtitle, dynamicStyles.subtitle]}>
            Aboneliklerinizi hemen organize etmeye başlayın
          </Text>
        </View>

        <View style={[styles.card, dynamicStyles.card]}>
          <View style={styles.fieldGroup}>
            <Text style={[styles.label, dynamicStyles.label]}>Ad Soyad</Text>
            <TextInput
              style={[styles.input, dynamicStyles.input]}
              value={fullName}
              onChangeText={setFullName}
              placeholder="Adınız Soyadınız"
              placeholderTextColor={theme.textSecondary}
              autoCapitalize="words"
            />
          </View>

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

          <View style={styles.fieldGroup}>
            <Text style={[styles.label, dynamicStyles.label]}>Şifre Tekrarı</Text>
            <TextInput
              style={[styles.input, dynamicStyles.input]}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="••••••••"
              placeholderTextColor={theme.textSecondary}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            style={[styles.primaryButton, dynamicStyles.registerButton]}
            onPress={handleRegister}
            activeOpacity={0.8}
          >
            <Text style={[styles.primaryButtonText, dynamicStyles.registerButtonText]}>
              Kayıt Ol ve Başla
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footerContainer}>
          <Text style={[styles.footerText, dynamicStyles.loginText]}>
            Zaten hesabınız var mı?{' '}
          </Text>
          <TouchableOpacity onPress={handleNavigateLogin}>
            <Text style={[styles.linkText, dynamicStyles.loginLinkText]}>Giriş Yapın</Text>
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
  title: {
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
