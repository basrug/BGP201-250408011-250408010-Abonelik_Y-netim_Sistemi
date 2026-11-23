import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { SubscriptionProvider } from './src/context/SubscriptionContext';
import { HomeScreen } from './src/screens/HomeScreen';
import { SubscriptionsScreen } from './src/screens/SubscriptionsScreen';
import { AddSubscriptionScreen } from './src/screens/AddSubscriptionScreen';
import { SubscriptionDetailScreen } from './src/screens/SubscriptionDetailScreen';
import { SPACING, FONT_SIZES } from './src/constants/theme';
import { Subscription } from './src/types';

type TabName = 'Home' | 'Subscriptions' | 'AddSubscription' | 'SubscriptionDetail';

const MainApp: React.FC = () => {
  const { theme, isDark } = useTheme();
  const [activeTab, setActiveTab] = useState<TabName>('Home');
  const [activeSubscription, setActiveSubscription] = useState<Subscription | undefined>(undefined);

  const handleNavigate = (screen: string, sub?: Subscription) => {
    if (sub) {
      setActiveSubscription(sub);
    }
    setActiveTab(screen as TabName);
  };

  const navigationProp = {
    navigate: (screen: string) => handleNavigate(screen),
    goBack: () => setActiveTab('Subscriptions'),
  };

  const renderCurrentScreen = () => {
    switch (activeTab) {
      case 'Home':
        return (
          <HomeScreen
            navigation={navigationProp}
            onNavigate={(screen, sub) => handleNavigate(screen, sub)}
          />
        );
      case 'Subscriptions':
        return (
          <SubscriptionsScreen
            navigation={navigationProp}
            onNavigate={(screen, sub) => handleNavigate(screen, sub)}
          />
        );
      case 'AddSubscription':
        return (
          <AddSubscriptionScreen
            navigation={navigationProp}
            onSuccess={() => setActiveTab('Subscriptions')}
          />
        );
      case 'SubscriptionDetail':
        return (
          <SubscriptionDetailScreen
            subscription={activeSubscription}
            navigation={navigationProp}
            onBack={() => setActiveTab('Subscriptions')}
          />
        );
      default:
        return <HomeScreen navigation={navigationProp} />;
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <View style={styles.screenContainer}>{renderCurrentScreen()}</View>

      {/* Bottom Tab Bar */}
      <View
        style={[
          styles.tabBar,
          {
            backgroundColor: theme.colors.surface,
            borderTopColor: theme.colors.border,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => setActiveTab('Home')}
        >
          <Text
            style={[
              styles.tabIcon,
              {
                color:
                  activeTab === 'Home'
                    ? theme.colors.primary
                    : theme.colors.textSecondary,
              },
            ]}
          >
            🏠
          </Text>
          <Text
            style={[
              styles.tabLabel,
              {
                color:
                  activeTab === 'Home'
                    ? theme.colors.primary
                    : theme.colors.textSecondary,
                fontWeight: activeTab === 'Home' ? '700' : '500',
              },
            ]}
          >
            Ana Sayfa
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => setActiveTab('Subscriptions')}
        >
          <Text
            style={[
              styles.tabIcon,
              {
                color:
                  activeTab === 'Subscriptions'
                    ? theme.colors.primary
                    : theme.colors.textSecondary,
              },
            ]}
          >
            📋
          </Text>
          <Text
            style={[
              styles.tabLabel,
              {
                color:
                  activeTab === 'Subscriptions'
                    ? theme.colors.primary
                    : theme.colors.textSecondary,
                fontWeight: activeTab === 'Subscriptions' ? '700' : '500',
              },
            ]}
          >
            Abonelikler
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => setActiveTab('AddSubscription')}
        >
          <Text
            style={[
              styles.tabIcon,
              {
                color:
                  activeTab === 'AddSubscription'
                    ? theme.colors.primary
                    : theme.colors.textSecondary,
              },
            ]}
          >
            ➕
          </Text>
          <Text
            style={[
              styles.tabLabel,
              {
                color:
                  activeTab === 'AddSubscription'
                    ? theme.colors.primary
                    : theme.colors.textSecondary,
                fontWeight: activeTab === 'AddSubscription' ? '700' : '500',
              },
            ]}
          >
            Yeni Ekle
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <SubscriptionProvider>
        <MainApp />
      </SubscriptionProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    height: 60,
    borderTopWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: SPACING.xs,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xs,
  },
  tabIcon: {
    fontSize: 20,
    marginBottom: 2,
  },
  tabLabel: {
    fontSize: FONT_SIZES.xs,
  },
});
