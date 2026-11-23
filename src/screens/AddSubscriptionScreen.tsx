import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useSubscriptions } from '../context/SubscriptionContext';
import { SPACING, FONT_SIZES } from '../constants/theme';
import { MainTabScreenProps } from '../navigation/types';

export const AddSubscriptionScreen: React.FC<MainTabScreenProps<'AddSubscription'>> = ({
  navigation,
}) => {
  const { theme } = useTheme();
  const { addSubscription } = useSubscriptions();

  const handleAddSampleSubscription = (): void => {
    addSubscription({
      name: 'YouTube Premium',
      amount: 79.99,
      currency: 'TRY',
      billingCycle: 'monthly',
      paymentDay: 10,
      category: 'Eğlence',
    });
    Alert.alert('Başarılı', 'Örnek abonelik eklendi!');
    navigation.navigate('Subscriptions');
  };

  const dynamicStyles = {
    screen: {
      backgroundColor: theme.background,
    },
    card: {
      backgroundColor: theme.surface,
      borderColor: theme.border,
    },
    badge: {
      backgroundColor: theme.primary,
    },
    badgeText: {
      color: theme.buttonText,
    },
    title: {
      color: theme.text,
    },
    description: {
      color: theme.textSecondary,
    },
    button: {
      backgroundColor: theme.primary,
    },
    buttonText: {
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

        <Text style={[styles.title, dynamicStyles.title]}>Yeni Abonelik Ekle</Text>
        <Text style={[styles.description, dynamicStyles.description]}>
          Bu ekran Öğrenci 2 (Kaan) tarafından CustomInput bileşeni ve form doğrulama kuralları ile
          geliştirilecektir.
        </Text>

        <TouchableOpacity
          style={[styles.button, dynamicStyles.button]}
          onPress={handleAddSampleSubscription}
          activeOpacity={0.8}
        >
          <Text style={[styles.buttonText, dynamicStyles.buttonText]}>
            Hafta 9 Demosu: Örnek Abonelik Ekle
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
  description: {
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
