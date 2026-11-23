import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useSubscriptions } from '../context/SubscriptionContext';
import { SPACING, FONT_SIZES } from '../constants/theme';
import { MainTabScreenProps } from '../navigation/types';

export const HomeScreen: React.FC<MainTabScreenProps<'Home'>> = ({ navigation }) => {
  const { theme } = useTheme();
  const { subscriptions } = useSubscriptions();

  const handleOpenDetailDemo = (): void => {
    if (subscriptions.length > 0) {
      navigation.navigate('SubscriptionDetail', { subscriptionId: subscriptions[0].id });
    }
  };

  const dynamicStyles = {
    screen: {
      backgroundColor: theme.background,
    },
    card: {
      backgroundColor: theme.surface,
      borderColor: theme.border,
    },
    title: {
      color: theme.text,
    },
    subtitle: {
      color: theme.textSecondary,
    },
    highlight: {
      color: theme.primary,
    },
    badge: {
      backgroundColor: theme.primary,
    },
    badgeText: {
      color: theme.buttonText,
    },
    detailButton: {
      backgroundColor: theme.primary,
    },
    detailButtonText: {
      color: theme.buttonText,
    },
  };

  return (
    <ScrollView style={[styles.screen, dynamicStyles.screen]} contentContainerStyle={styles.content}>
      <View style={[styles.card, dynamicStyles.card]}>
        <View style={styles.badgeRow}>
          <View style={[styles.badge, dynamicStyles.badge]}>
            <Text style={[styles.badgeText, dynamicStyles.badgeText]}>Öğrenci 2 Ekranı</Text>
          </View>
        </View>

        <Text style={[styles.title, dynamicStyles.title]}>Ana Sayfa Paneli</Text>
        <Text style={[styles.subtitle, dynamicStyles.subtitle]}>
          Kayıtlı toplam <Text style={dynamicStyles.highlight}>{subscriptions.length}</Text> adet
          abonelik bulunmaktadır.
        </Text>

        <TouchableOpacity
          style={[styles.button, dynamicStyles.detailButton]}
          onPress={handleOpenDetailDemo}
          activeOpacity={0.8}
        >
          <Text style={[styles.buttonText, dynamicStyles.detailButtonText]}>
            Örnek Abonelik Detayını Gör
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    padding: SPACING.md,
  },
  card: {
    borderRadius: SPACING.md,
    borderWidth: 1,
    padding: SPACING.lg,
    marginTop: SPACING.md,
  },
  badgeRow: {
    flexDirection: 'row',
    marginBottom: SPACING.sm,
  },
  badge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: SPACING.xs,
  },
  badgeText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
  },
  title: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '700',
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: FONT_SIZES.sm,
    marginBottom: SPACING.lg,
    lineHeight: 20,
  },
  button: {
    borderRadius: SPACING.sm,
    paddingVertical: SPACING.md,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
});
