import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BillsScreen } from '../screens/BillsScreen';
import { CardDetailsScreen } from '../screens/CardDetailsScreen';
import { CardManageScreen } from '../screens/CardManageScreen';
import { NotificationsScreen } from '../screens/NotificationsScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { RechargeScreen } from '../screens/RechargeScreen';
import { ScanPayScreen } from '../screens/ScanPayScreen';
import { SearchScreen } from '../screens/SearchScreen';
import { SendMoneyScreen } from '../screens/SendMoneyScreen';
import { colors } from '../theme/colors';
import { MainShell } from './MainShell';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.pageBg,
    primary: colors.orange,
  },
};

export function RootNavigator() {
  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator
        screenOptions={{
          headerTintColor: colors.orange,
          headerTitleStyle: { fontWeight: '700' },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: colors.pageBg },
        }}
      >
        <Stack.Screen name="Main" component={MainShell} options={{ headerShown: false }} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} options={{ title: 'Alerts' }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
        <Stack.Screen name="Search" component={SearchScreen} options={{ title: 'Search' }} />
        <Stack.Screen name="ScanPay" component={ScanPayScreen} options={{ title: 'Scan & Pay' }} />
        <Stack.Screen name="SendMoney" component={SendMoneyScreen} options={{ title: 'Send money' }} />
        <Stack.Screen name="Bills" component={BillsScreen} options={{ title: 'Pay bills' }} />
        <Stack.Screen name="Recharge" component={RechargeScreen} options={{ title: 'Recharge' }} />
        <Stack.Screen name="CardManage" component={CardManageScreen} options={{ title: 'Manage card' }} />
        <Stack.Screen name="CardDetails" component={CardDetailsScreen} options={{ title: 'Card details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
