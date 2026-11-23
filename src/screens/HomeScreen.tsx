import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Subscription } from '../types';
import { useTheme } from '../context/ThemeContext';
import { useSubscriptions } from '../context/SubscriptionContext';
import { SubscriptionCard } from '../components/SubscriptionCard';
import { SPACING, FONT_SIZES } from '../constants/theme';

export interface HomeScreenProps {
  navigation?: {
    navigate: (screen: string) => void;
  };
  onNavigate?: (screen: string, sub?: Subscription) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation, onNavigate }) => {
  const { theme, isDark, toggleTheme } = useTheme();
  const { subscriptions, setSelectedSubscription } = useSubscriptions();

  const handleNavigate = (screen: string, sub?: Subscription) => {
    if (sub) {
      setSelectedSubscription(sub);
    }
    if (navigation?.navigate) {
      navigation.navigate(screen);
    } else if (onNavigate) {
      onNavigate(screen, sub);
    }
  };

  // Spending totals grouped by currency
  const totals = useMemo(() => {
    const summary: Record<string, number> = { TRY: 0, USD: 0, EUR: 0 };
    subscriptions.forEach((sub) => {
      const monthlyAmount =
        sub.billingCycle === 'yearly' ? sub.amount / 12 : sub.amount;
      summary[sub.currency] = (summary[sub.currency] || 0) + monthlyAmount;
    });
    return summary;
  }, [subscriptions]);

  const upcomingSubscriptions = useMemo(() => {
    return [...subscriptions]
      .sort((a, b) => a.paymentDay - b.paymentDay)
      .slice(0, 3);
  }, [subscriptions]);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Aboneliklerim
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            Aylık gider takibi ve kontrol
          </Text>
        </View>

        <TouchableOpacity
          onPress={toggleTheme}
          style={[
            styles.themeButton,
            { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
          ]}
        >
          <Text style={[styles.themeText, { color: theme.colors.text }]}>
            {isDark ? '☀️ Açık' : '🌙 Koyu'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Summary Cards */}
      <View style={[styles.summaryCard, { backgroundColor: theme.colors.primary }]}>
        <Text style={styles.summaryLabel}>Tahmini Aylık Toplam Harcama</Text>
        <View style={styles.totalsRow}>
          {totals.TRY > 0 && (
            <Text style={styles.totalAmount}>₺{totals.TRY.toFixed(0)}</Text>
          )}
          {totals.USD > 0 && (
            <Text style={styles.totalAmountSecondary}>+ ${totals.USD.toFixed(0)}</Text>
          )}
          {totals.EUR > 0 && (
            <Text style={styles.totalAmountSecondary}>+ €{totals.EUR.toFixed(0)}</Text>
          )}
        </View>
        <View style={styles.summaryFooter}>
          <Text style={styles.activeCountText}>
            Toplam {subscriptions.length} aktif abonelik
          </Text>
        </View>
      </View>

      {/* Quick Action */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => handleNavigate('AddSubscription')}
        style={[
          styles.actionButton,
          { backgroundColor: theme.colors.surface, borderColor: theme.colors.primary },
        ]}
      >
        <Text style={[styles.actionButtonText, { color: theme.colors.primary }]}>
          + Yeni Abonelik Ekle
        </Text>
      </TouchableOpacity>

      {/* Upcoming Section */}
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Yaklaşan Ödemeler
        </Text>
        <TouchableOpacity onPress={() => handleNavigate('Subscriptions')}>
          <Text style={[styles.seeAllText, { color: theme.colors.primary }]}>
            Tümünü Gör ({subscriptions.length})
          </Text>
        </TouchableOpacity>
      </View>

      {upcomingSubscriptions.length === 0 ? (
        <View
          style={[
            styles.emptyCard,
            { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
          ]}
        >
          <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
            Henüz eklenmiş bir abonelik yok.
          </Text>
        </View>
      ) : (
        upcomingSubscriptions.map((sub) => (
          <SubscriptionCard
            key={sub.id}
            subscription={sub}
            onPress={(item) => handleNavigate('SubscriptionDetail', item)}
          />
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: SPACING.md, paddingBottom: SPACING.xl * 2 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  title: { fontSize: FONT_SIZES.xxl, fontWeight: '800' },
  subtitle: { fontSize: FONT_SIZES.sm, marginTop: 2 },
  themeButton: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 8,
    borderWidth: 1,
  },
  themeText: { fontSize: FONT_SIZES.xs, fontWeight: '600' },
  summaryCard: {
    borderRadius: 16,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  summaryLabel: { color: 'rgba(255,255,255,0.85)', fontSize: FONT_SIZES.sm, fontWeight: '600' },
  totalsRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: SPACING.sm,
    marginVertical: SPACING.xs,
    flexWrap: 'wrap',
  },
  totalAmount: { color: '#FFFFFF', fontSize: 32, fontWeight: '900' },
  totalAmountSecondary: { color: '#FFFFFF', fontSize: FONT_SIZES.xl, fontWeight: '700' },
  summaryFooter: { marginTop: SPACING.xs },
  activeCountText: { color: 'rgba(255,255,255,0.9)', fontSize: FONT_SIZES.xs, fontWeight: '500' },
  actionButton: {
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderRadius: 12,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.lg,
  },
  actionButtonText: { fontSize: FONT_SIZES.sm, fontWeight: '700' },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  sectionTitle: { fontSize: FONT_SIZES.lg, fontWeight: '700' },
  seeAllText: { fontSize: FONT_SIZES.sm, fontWeight: '600' },
  emptyCard: {
    padding: SPACING.lg,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  emptyText: { fontSize: FONT_SIZES.sm },
});
