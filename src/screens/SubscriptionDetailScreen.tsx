import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useSubscriptions } from '../context/SubscriptionContext';
import { SPACING, FONT_SIZES } from '../constants/theme';
import { RootStackScreenProps } from '../navigation/types';

export const SubscriptionDetailScreen: React.FC<
  RootStackScreenProps<'SubscriptionDetail'>
> = ({ route, navigation }) => {
  const { subscriptionId } = route.params;
  const { theme } = useTheme();
  const { subscriptions, deleteSubscription } = useSubscriptions();

  const subscription = subscriptions.find((item) => item.id === subscriptionId);

  const handleDelete = (): void => {
    Alert.alert('Aboneliği Sil', 'Bu aboneliği silmek istediğinize emin misiniz?', [
      { text: 'İptal', style: 'cancel' },
      {
        text: 'Sil',
        style: 'destructive',
        onPress: () => {
          deleteSubscription(subscriptionId);
          navigation.goBack();
        },
      },
    ]);
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
    subtitle: {
      color: theme.textSecondary,
    },
    rowBorder: {
      borderBottomColor: theme.border,
    },
    label: {
      color: theme.textSecondary,
    },
    value: {
      color: theme.text,
    },
    deleteButton: {
      borderColor: theme.error,
    },
    deleteButtonText: {
      color: theme.error,
    },
  };

  if (!subscription) {
    return (
      <View style={[styles.screen, styles.center, dynamicStyles.screen]}>
        <Text style={[styles.title, dynamicStyles.title]}>Abonelik bulunamadı.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.screen, dynamicStyles.screen]} contentContainerStyle={styles.content}>
      <View style={[styles.card, dynamicStyles.card]}>
        <View style={styles.badgeRow}>
          <View style={[styles.badge, dynamicStyles.badge]}>
            <Text style={[styles.badgeText, dynamicStyles.badgeText]}>Öğrenci 2 Ekranı</Text>
          </View>
        </View>

        <Text style={[styles.title, dynamicStyles.title]}>{subscription.name}</Text>
        <Text style={[styles.subtitle, dynamicStyles.subtitle]}>
          Abonelik Detay ve Yönetim Kartı
        </Text>

        <View style={[styles.detailRow, dynamicStyles.rowBorder]}>
          <Text style={[styles.label, dynamicStyles.label]}>Tutar</Text>
          <Text style={[styles.value, dynamicStyles.value]}>
            {subscription.amount.toFixed(2)} {subscription.currency}
          </Text>
        </View>

        <View style={[styles.detailRow, dynamicStyles.rowBorder]}>
          <Text style={[styles.label, dynamicStyles.label]}>Ödeme Periyodu</Text>
          <Text style={[styles.value, dynamicStyles.value]}>
            {subscription.billingCycle === 'monthly' ? 'Aylık' : 'Yıllık'}
          </Text>
        </View>

        <View style={[styles.detailRow, dynamicStyles.rowBorder]}>
          <Text style={[styles.label, dynamicStyles.label]}>Ödeme Günü</Text>
          <Text style={[styles.value, dynamicStyles.value]}>Her ayın {subscription.paymentDay}. günü</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={[styles.label, dynamicStyles.label]}>Kategori</Text>
          <Text style={[styles.value, dynamicStyles.value]}>{subscription.category}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.deleteButton, dynamicStyles.deleteButton]}
        onPress={handleDelete}
        activeOpacity={0.8}
      >
        <Text style={[styles.deleteButtonText, dynamicStyles.deleteButtonText]}>
          Aboneliği Sil (Test)
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.md,
  },
  content: {
    padding: SPACING.md,
  },
  card: {
    borderRadius: SPACING.md,
    borderWidth: 1,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
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
    marginBottom: SPACING.md,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
  },
  label: {
    fontSize: FONT_SIZES.sm,
  },
  value: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },
  deleteButton: {
    borderWidth: 1,
    borderRadius: SPACING.sm,
    paddingVertical: SPACING.md,
    alignItems: 'center',
  },
  deleteButtonText: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
});
