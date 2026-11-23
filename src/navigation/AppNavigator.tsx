import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { useTheme } from '../context/ThemeContext';
import { FONT_SIZES } from '../constants/theme';
import { TabNavigator } from './TabNavigator';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { SubscriptionDetailScreen } from '../screens/SubscriptionDetailScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.surface,
        },
        headerTintColor: theme.text,
        headerTitleStyle: {
          fontSize: FONT_SIZES.lg,
          fontWeight: '700',
        },
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: theme.background,
        },
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          title: 'Kayıt Ol',
        }}
      />
      <Stack.Screen
        name="MainTabs"
        component={TabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SubscriptionDetail"
        component={SubscriptionDetailScreen}
        options={{
          title: 'Abonelik Detayı',
        }}
      />
    </Stack.Navigator>
  );
};
