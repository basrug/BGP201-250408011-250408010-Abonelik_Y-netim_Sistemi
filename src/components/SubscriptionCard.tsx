import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { Subscription, SubscriptionCategory } from '../types';
import { useTheme } from '../context/ThemeContext';
import { SPACING, FONT_SIZES } from '../constants/theme';

export interface SubscriptionCardProps {
  subscription: Subscription;
  onPress?: (subscription: Subscription) => void;
  onDelete?: (id: string) => void;
  style?: StyleProp<ViewStyle>;
}

const CATEGORY_COLORS: Record<SubscriptionCategory, string> = {
  Eğlence: '#8338EC',
  Yazılım: '#3A86FF',
  Fatura: '#FB5607',
  Eğitim: '#06D6A0',
  Diğer: '#6C757D',
};

const CURRENCY_SYMBOLS: Record<string, string> = {
  TRY: '₺',
  USD: '$',
  EUR: '€',
};

export const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  subscription,
  onPress,
  onDelete,
  style,
}) => {
  const { theme } = useTheme();
  const categoryColor = CATEGORY_COLORS[subscription.category] || theme.colors.primary;
  const currencySymbol = CURRENCY_SYMBOLS[subscription.currency] || subscription.currency;

  const cycleText = subscription.billingCycle === 'monthly' ? 'Aylık' : 'Yıllık';

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => onPress?.(subscription)}
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
        },
        style,
      ]}
    >
      <View style={styles.cardHeader}>
        <View style={styles.titleContainer}>
          <Text
            style={[styles.name, { color: theme.colors.text }]}
            numberOfLines={1}
          >
            {subscription.name}
          </Text>
          <View
            style={[
              styles.categoryBadge,
              { backgroundColor: `${categoryColor}20` },
            ]}
          >
            <Text style={[styles.categoryText, { color: categoryColor }]}>
              {subscription.category}
            </Text>
          </View>
        </View>

        <View style={styles.priceContainer}>
          <Text style={[styles.amount, { color: theme.colors.primary }]}>
            {subscription.amount.toFixed(2)} {currencySymbol}
          </Text>
          <Text style={[styles.cycleText, { color: theme.colors.textSecondary }]}>
            /{cycleText}
          </Text>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <Text style={[styles.paymentDayText, { color: theme.colors.textSecondary }]}>
          Ödeme: Her ayın {subscription.paymentDay}. günü
        </Text>

        {onDelete && (
          <TouchableOpacity
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            onPress={() => onDelete(subscription.id)}
            style={styles.deleteButton}
          >
            <Text style={[styles.deleteButtonText, { color: theme.colors.error }]}>
              Sil
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    borderWidth: 1,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  titleContainer: {
    flex: 1,
    marginRight: SPACING.sm,
  },
  name: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    marginBottom: SPACING.xs,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: 6,
  },
  categoryText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '800',
  },
  cycleText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '500',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: SPACING.xs,
  },
  paymentDayText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '500',
  },
  deleteButton: {
    paddingHorizontal: SPACING.xs,
  },
  deleteButtonText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
  },
});
