import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Subscription } from '../types';
import { useTheme } from '../context/ThemeContext';
import { useSubscriptions } from '../context/SubscriptionContext';
import { SPACING, FONT_SIZES } from '../constants/theme';

export interface SubscriptionDetailScreenProps {
  subscription?: Subscription;
  navigation?: {
    goBack: () => void;
    navigate: (screen: string) => void;
  };
  onBack?: () => void;
}

export const SubscriptionDetailScreen: React.FC<SubscriptionDetailScreenProps> = ({
  subscription: propSubscription,
  navigation,
  onBack,
}) => {
  const { theme } = useTheme();
  const { selectedSubscription, deleteSubscription } = useSubscriptions();

  const subscription = propSubscription || selectedSubscription;

  const handleBack = () => {
    if (navigation?.goBack) {
      navigation.goBack();
    } else if (onBack) {
      onBack();
    }
  };

  const handleDelete = () => {
    if (!subscription) return;
    Alert.alert(
      'Aboneliği Sil',
      `"${subscription.name}" aboneliğini silmek istediğinize emin misiniz?`,
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Sil',
          style: 'destructive',
          onPress: () => {
            deleteSubscription(subscription.id);
            handleBack();
          },
        },
      ]
    );
  };

  if (!subscription) {
    return (
      <View style={[styles.centerContainer, { backgroundColor: theme.colors.background }]}>
        <Text style={[styles.notFoundText, { color: theme.colors.textSecondary }]}>
          Abonelik seçilmedi veya bulunamadı.
        </Text>
        <TouchableOpacity
          onPress={handleBack}
          style={[styles.backButton, { backgroundColor: theme.colors.primary }]}
        >
          <Text style={styles.backButtonText}>Geri Dön</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const isMonthly = subscription.billingCycle === 'monthly';
  const yearlyEstimate = isMonthly ? subscription.amount * 12 : subscription.amount;
  const monthlyEstimate = isMonthly ? subscription.amount : subscription.amount / 12;

  // Calculate days until next payment
  const today = new Date();
  const currentDay = today.getDate();
  const daysUntilPayment =
    subscription.paymentDay >= currentDay
      ? subscription.paymentDay - currentDay
      : 30 - currentDay + subscription.paymentDay;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={handleBack} style={styles.navButton}>
          <Text style={[styles.navButtonText, { color: theme.colors.primary }]}>
            ← Geri
          </Text>
        </TouchableOpacity>
        <Text style={[styles.navTitle, { color: theme.colors.text }]}>
          Abonelik Detayı
        </Text>
        <View style={styles.navSpacer} />
      </View>

      {/* Hero Card */}
      <View
        style={[
          styles.heroCard,
          { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
        ]}
      >
        <View style={styles.badge}>
          <Text style={[styles.badgeText, { color: theme.colors.primary }]}>
            {subscription.category}
          </Text>
        </View>

        <Text style={[styles.name, { color: theme.colors.text }]}>
          {subscription.name}
        </Text>

        <Text style={[styles.price, { color: theme.colors.primary }]}>
          {subscription.amount.toFixed(2)} {subscription.currency}
        </Text>
        <Text style={[styles.cycle, { color: theme.colors.textSecondary }]}>
          {isMonthly ? 'Aylık Fatura' : 'Yıllık Fatura'}
        </Text>
      </View>

      {/* Details List */}
      <View
        style={[
          styles.detailsCard,
          { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
        ]}
      >
        <View style={styles.detailRow}>
          <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>
            Ödeme Günü
          </Text>
          <Text style={[styles.detailValue, { color: theme.colors.text }]}>
            Her ayın {subscription.paymentDay}. günü
          </Text>
        </View>

        <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />

        <View style={styles.detailRow}>
          <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>
            Sonraki Ödemeye Kalan
          </Text>
          <Text style={[styles.detailValue, { color: theme.colors.primary }]}>
            {daysUntilPayment === 0 ? 'Bugün!' : `${daysUntilPayment} gün`}
          </Text>
        </View>

        <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />

        <View style={styles.detailRow}>
          <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>
            Aylık Maliyet
          </Text>
          <Text style={[styles.detailValue, { color: theme.colors.text }]}>
            ~{monthlyEstimate.toFixed(2)} {subscription.currency}
          </Text>
        </View>

        <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />

        <View style={styles.detailRow}>
          <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>
            Yıllık Toplam Maliyet
          </Text>
          <Text style={[styles.detailValue, { color: theme.colors.text }]}>
            {yearlyEstimate.toFixed(2)} {subscription.currency}
          </Text>
        </View>
      </View>

      {/* Delete Action */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleDelete}
        style={[styles.deleteButton, { borderColor: theme.colors.error }]}
      >
        <Text style={[styles.deleteButtonText, { color: theme.colors.error }]}>
          Aboneliği Sil
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: SPACING.md, paddingBottom: SPACING.xl * 2 },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  navButton: { paddingVertical: SPACING.xs, paddingHorizontal: SPACING.xs },
  navButtonText: { fontSize: FONT_SIZES.md, fontWeight: '700' },
  navTitle: { fontSize: FONT_SIZES.lg, fontWeight: '700' },
  navSpacer: { width: 40 },
  heroCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: SPACING.xl,
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  badge: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: 12,
    backgroundColor: 'rgba(67, 97, 238, 0.1)',
    marginBottom: SPACING.sm,
  },
  badgeText: { fontSize: FONT_SIZES.xs, fontWeight: '700' },
  name: { fontSize: FONT_SIZES.xxl, fontWeight: '800', marginBottom: SPACING.xs },
  price: { fontSize: 32, fontWeight: '900' },
  cycle: { fontSize: FONT_SIZES.sm, marginTop: 4 },
  detailsCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
  },
  detailLabel: { fontSize: FONT_SIZES.sm, fontWeight: '500' },
  detailValue: { fontSize: FONT_SIZES.sm, fontWeight: '700' },
  divider: { height: 1, width: '100%' },
  deleteButton: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButtonText: { fontSize: FONT_SIZES.md, fontWeight: '700' },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  notFoundText: { fontSize: FONT_SIZES.md, marginBottom: SPACING.md },
  backButton: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: 10,
  },
  backButtonText: { color: '#FFFFFF', fontWeight: '700', fontSize: FONT_SIZES.sm },
});
