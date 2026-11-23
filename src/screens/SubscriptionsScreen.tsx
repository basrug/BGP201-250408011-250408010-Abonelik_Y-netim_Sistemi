import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useSubscriptions } from '../context/SubscriptionContext';
import { SPACING, FONT_SIZES } from '../constants/theme';
import { MainTabScreenProps } from '../navigation/types';
import { Subscription } from '../types';

export const SubscriptionsScreen: React.FC<MainTabScreenProps<'Subscriptions'>> = ({
  navigation,
}) => {
  const { theme } = useTheme();
  const { subscriptions } = useSubscriptions();

  const handleSelectSubscription = (id: string): void => {
    navigation.navigate('SubscriptionDetail', { subscriptionId: id });
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
    headerText: {
      color: theme.text,
    },
    subHeader: {
      color: theme.textSecondary,
    },
    itemTitle: {
      color: theme.text,
    },
    itemCategory: {
      color: theme.textSecondary,
    },
    itemAmount: {
      color: theme.primary,
    },
    itemCycle: {
      color: theme.textSecondary,
    },
  };

  const renderItem = ({ item }: { item: Subscription }) => (
    <TouchableOpacity
      style={[styles.itemCard, dynamicStyles.card]}
      onPress={() => handleSelectSubscription(item.id)}
      activeOpacity={0.7}
    >
      <View style={styles.itemInfo}>
        <Text style={[styles.itemName, dynamicStyles.itemTitle]}>{item.name}</Text>
        <Text style={[styles.itemCategory, dynamicStyles.itemCategory]}>{item.category}</Text>
      </View>
      <View style={styles.itemPriceSection}>
        <Text style={[styles.itemAmount, dynamicStyles.itemAmount]}>
          {item.amount.toFixed(2)} {item.currency}
        </Text>
        <Text style={[styles.itemCycle, dynamicStyles.itemCycle]}>
          {item.billingCycle === 'monthly' ? '/ay' : '/yıl'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.screen, dynamicStyles.screen]}>
      <FlatList
        data={subscriptions}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.header}>
            <View style={[styles.badge, dynamicStyles.badge]}>
              <Text style={[styles.badgeText, dynamicStyles.badgeText]}>Öğrenci 2 Ekranı</Text>
            </View>
            <Text style={[styles.headerTitle, dynamicStyles.headerText]}>Aboneliklerim</Text>
            <Text style={[styles.headerSubtitle, dynamicStyles.subHeader]}>
              Detayları görmek için aboneliğe dokunun
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  listContent: {
    padding: SPACING.md,
  },
  header: {
    marginBottom: SPACING.md,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: SPACING.xs,
    marginBottom: SPACING.xs,
  },
  badgeText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '700',
  },
  headerSubtitle: {
    fontSize: FONT_SIZES.sm,
    marginTop: SPACING.xs,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: SPACING.md,
    borderWidth: 1,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
  itemCategory: {
    fontSize: FONT_SIZES.xs,
    marginTop: SPACING.xs,
  },
  itemPriceSection: {
    alignItems: 'flex-end',
  },
  itemAmount: {
    fontSize: FONT_SIZES.md,
    fontWeight: '700',
  },
  itemCycle: {
    fontSize: FONT_SIZES.xs,
    marginTop: SPACING.xs,
  },
});
