import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Switch,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useSubscriptions } from '../context/SubscriptionContext';
import { SPACING, FONT_SIZES } from '../constants/theme';
import { MainTabScreenProps } from '../navigation/types';

export const ProfileScreen: React.FC<MainTabScreenProps<'Profile'>> = ({ navigation }) => {
  const { theme, isDark, toggleTheme } = useTheme();
  const { subscriptions } = useSubscriptions();

  const handleLogout = (): void => {
    navigation.replace('Login');
  };

  const dynamicStyles = {
    screen: {
      backgroundColor: theme.background,
    },
    card: {
      backgroundColor: theme.surface,
      borderColor: theme.border,
    },
    avatar: {
      backgroundColor: theme.primary,
    },
    avatarText: {
      color: theme.buttonText,
    },
    title: {
      color: theme.text,
    },
    subtitle: {
      color: theme.textSecondary,
    },
    statValue: {
      color: theme.primary,
    },
    statLabel: {
      color: theme.textSecondary,
    },
    sectionTitle: {
      color: theme.textSecondary,
    },
    itemText: {
      color: theme.text,
    },
    itemSubtext: {
      color: theme.textSecondary,
    },
    logoutButton: {
      borderColor: theme.error,
    },
    logoutButtonText: {
      color: theme.error,
    },
    borderTop: {
      borderTopColor: theme.border,
    },
    borderBottom: {
      borderBottomColor: theme.border,
    },
  };

  return (
    <ScrollView style={[styles.screen, dynamicStyles.screen]} contentContainerStyle={styles.content}>
      {/* Profile Header */}
      <View style={[styles.profileCard, dynamicStyles.card]}>
        <View style={[styles.avatarContainer, dynamicStyles.avatar]}>
          <Text style={[styles.avatarText, dynamicStyles.avatarText]}>AY</Text>
        </View>
        <Text style={[styles.profileName, dynamicStyles.title]}>Ahmet Yılmaz</Text>
        <Text style={[styles.profileEmail, dynamicStyles.subtitle]}>ahmet.yilmaz@example.com</Text>

        <View style={[styles.statsContainer, dynamicStyles.borderTop]}>
          <View style={styles.statBox}>
            <Text style={[styles.statValue, dynamicStyles.statValue]}>{subscriptions.length}</Text>
            <Text style={[styles.statLabel, dynamicStyles.statLabel]}>Aktif Abonelik</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={[styles.statValue, dynamicStyles.statValue]}>TRY</Text>
            <Text style={[styles.statLabel, dynamicStyles.statLabel]}>Varsayılan Birim</Text>
          </View>
        </View>
      </View>

      {/* Preferences Section */}
      <Text style={[styles.sectionHeading, dynamicStyles.sectionTitle]}>GÖRÜNÜM VE AYARLAR</Text>
      <View style={[styles.sectionCard, dynamicStyles.card]}>
        <View style={[styles.settingRow, dynamicStyles.borderBottom]}>
          <View style={styles.settingInfo}>
            <Text style={[styles.settingTitle, dynamicStyles.itemText]}>Karanlık Tema</Text>
            <Text style={[styles.settingDescription, dynamicStyles.itemSubtext]}>
              {isDark ? 'Karanlık mod açık' : 'Aydınlık mod açık'}
            </Text>
          </View>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{ false: theme.border, true: theme.primary }}
            thumbColor={theme.surface}
          />
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={[styles.settingTitle, dynamicStyles.itemText]}>Para Birimi</Text>
            <Text style={[styles.settingDescription, dynamicStyles.itemSubtext]}>
              Raporlarda Türk Lirası (TRY) kullanılır
            </Text>
          </View>
          <Text style={[styles.settingValueText, dynamicStyles.itemSubtext]}>TRY</Text>
        </View>
      </View>

      {/* Account Info */}
      <Text style={[styles.sectionHeading, dynamicStyles.sectionTitle]}>HESAP BİLGİLERİ</Text>
      <View style={[styles.sectionCard, dynamicStyles.card]}>
        <View style={[styles.settingRow, dynamicStyles.borderBottom]}>
          <Text style={[styles.settingTitle, dynamicStyles.itemText]}>Öğrenci 1 (No1)</Text>
          <Text style={[styles.settingValueText, dynamicStyles.itemSubtext]}>Tamamlandı</Text>
        </View>
        <View style={styles.settingRow}>
          <Text style={[styles.settingTitle, dynamicStyles.itemText]}>Versiyon</Text>
          <Text style={[styles.settingValueText, dynamicStyles.itemSubtext]}>1.0.0 (Hafta 9 Demo)</Text>
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity
        style={[styles.logoutButton, dynamicStyles.logoutButton]}
        onPress={handleLogout}
        activeOpacity={0.8}
      >
        <Text style={[styles.logoutButtonText, dynamicStyles.logoutButtonText]}>Çıkış Yap</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    padding: SPACING.md,
    paddingBottom: SPACING.xxl,
  },
  profileCard: {
    alignItems: 'center',
    borderRadius: SPACING.md,
    borderWidth: 1,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  avatarContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  avatarText: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '700',
  },
  profileName: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    marginBottom: SPACING.xs,
  },
  profileEmail: {
    fontSize: FONT_SIZES.sm,
    marginBottom: SPACING.md,
  },
  statsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    paddingTop: SPACING.md,
    borderTopWidth: 1,
  },
  statBox: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: FONT_SIZES.xs,
    marginTop: SPACING.xs,
  },
  sectionHeading: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '700',
    marginBottom: SPACING.sm,
    marginLeft: SPACING.xs,
    letterSpacing: 0.5,
  },
  sectionCard: {
    borderRadius: SPACING.md,
    borderWidth: 1,
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.lg,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.md,
  },
  settingInfo: {
    flex: 1,
    marginRight: SPACING.sm,
  },
  settingTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: '500',
  },
  settingDescription: {
    fontSize: FONT_SIZES.xs,
    marginTop: SPACING.xs,
  },
  settingValueText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '500',
  },
  logoutButton: {
    borderWidth: 1,
    borderRadius: SPACING.sm,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  logoutButtonText: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
});
