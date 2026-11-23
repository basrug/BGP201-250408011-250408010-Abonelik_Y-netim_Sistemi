import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import { Subscription, SubscriptionCategory } from '../types';
import { useTheme } from '../context/ThemeContext';
import { useSubscriptions } from '../context/SubscriptionContext';
import { SubscriptionCard } from '../components/SubscriptionCard';
import { SPACING, FONT_SIZES, CATEGORY_OPTIONS } from '../constants/theme';

export interface SubscriptionsScreenProps {
  navigation?: {
    navigate: (screen: string) => void;
  };
  onNavigate?: (screen: string, sub?: Subscription) => void;
}

const ALL_CATEGORY = 'Tümü';

export const SubscriptionsScreen: React.FC<SubscriptionsScreenProps> = ({
  navigation,
  onNavigate,
}) => {
  const { theme } = useTheme();
  const { subscriptions, deleteSubscription, setSelectedSubscription } =
    useSubscriptions();

  const [selectedCategory, setSelectedCategory] = useState<string>(ALL_CATEGORY);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleCardPress = (subscription: Subscription) => {
    setSelectedSubscription(subscription);
    if (navigation?.navigate) {
      navigation.navigate('SubscriptionDetail');
    } else if (onNavigate) {
      onNavigate('SubscriptionDetail', subscription);
    }
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      'Aboneliği Sil',
      'Bu aboneliği silmek istediğinize emin misiniz?',
      [
        { text: 'Vazgeç', style: 'cancel' },
        {
          text: 'Sil',
          style: 'destructive',
          onPress: () => deleteSubscription(id),
        },
      ]
    );
  };

  const filteredSubscriptions = useMemo(() => {
    return subscriptions.filter((sub) => {
      const matchesCategory =
        selectedCategory === ALL_CATEGORY || sub.category === selectedCategory;
      const matchesSearch = sub.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase().trim());
      return matchesCategory && matchesSearch;
    });
  }, [subscriptions, selectedCategory, searchQuery]);

  const categories = [ALL_CATEGORY, ...CATEGORY_OPTIONS];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Tüm Abonelikler
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          {subscriptions.length} kayıtlı abonelik listeleniyor
        </Text>

        {/* Search Bar */}
        <TextInput
          style={[
            styles.searchInput,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
              color: theme.colors.text,
            },
          ]}
          placeholder="Abonelik ara..."
          placeholderTextColor={theme.colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        {/* Category Filters */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.categoryList}
          renderItem={({ item }) => {
            const isSelected = selectedCategory === item;
            return (
              <TouchableOpacity
                onPress={() => setSelectedCategory(item)}
                style={[
                  styles.filterChip,
                  {
                    backgroundColor: isSelected
                      ? theme.colors.primary
                      : theme.colors.surface,
                    borderColor: isSelected
                      ? theme.colors.primary
                      : theme.colors.border,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    { color: isSelected ? '#FFFFFF' : theme.colors.text },
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* Subscription List */}
      <FlatList
        data={filteredSubscriptions}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <SubscriptionCard
            subscription={item}
            onPress={handleCardPress}
            onDelete={handleDelete}
          />
        )}
        ListEmptyComponent={
          <View
            style={[
              styles.emptyContainer,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
              },
            ]}
          >
            <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>
              Abonelik Bulunamadı
            </Text>
            <Text
              style={[
                styles.emptySubtitle,
                { color: theme.colors.textSecondary },
              ]}
            >
              Filtrelerinizi değiştirin veya yeni bir abonelik ekleyin.
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.xs,
  },
  title: { fontSize: FONT_SIZES.xxl, fontWeight: '800' },
  subtitle: { fontSize: FONT_SIZES.sm, marginTop: 2, marginBottom: SPACING.sm },
  searchInput: {
    height: 44,
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: SPACING.md,
    fontSize: FONT_SIZES.md,
    marginBottom: SPACING.sm,
  },
  categoryList: { paddingVertical: SPACING.xs, gap: SPACING.xs },
  filterChip: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs + 2,
    borderRadius: 16,
    borderWidth: 1.5,
    marginRight: SPACING.xs,
  },
  filterChipText: { fontSize: FONT_SIZES.xs, fontWeight: '600' },
  listContent: { padding: SPACING.md, paddingBottom: SPACING.xl * 2 },
  emptyContainer: {
    padding: SPACING.xl,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    marginTop: SPACING.lg,
  },
  emptyTitle: { fontSize: FONT_SIZES.lg, fontWeight: '700', marginBottom: SPACING.xs },
  emptySubtitle: { fontSize: FONT_SIZES.sm, textAlign: 'center' },
});
