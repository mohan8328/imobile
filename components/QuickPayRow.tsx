import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRootNavigation } from '../navigation/useRootNavigation';
import { colors } from '../theme/colors';

const ACTIONS = [
  { key: 'scan' as const, label: 'Scan & Pay', icon: 'qr-code-outline' as const, screen: 'ScanPay' as const },
  { key: 'send' as const, label: 'Send\nmoney', icon: 'paper-plane-outline' as const, screen: 'SendMoney' as const },
  { key: 'bills' as const, label: 'Pay\nbills', icon: 'document-text-outline' as const, screen: 'Bills' as const },
  { key: 'recharge' as const, label: 'Recharge', icon: 'phone-portrait-outline' as const, screen: 'Recharge' as const },
];

export function QuickPayRow() {
  const navigation = useRootNavigation();

  return (
    <View style={styles.wrap}>
      <Text style={styles.sectionTitle}>Quick payments</Text>
      <View style={styles.row}>
        {ACTIONS.map((a) => (
          <Pressable
            key={a.key}
            style={({ pressed }) => [styles.tile, pressed && styles.pressed]}
            onPress={() => navigation.navigate(a.screen)}
          >
            <View style={styles.iconCircle}>
              <Ionicons name={a.icon} size={24} color={colors.orange} />
            </View>
            <Text style={styles.tileLabel}>{a.label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingTop: 12,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.ink,
    marginLeft: 20,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
  },
  tile: {
    flex: 1,
    alignItems: 'center',
    minWidth: 0,
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.orangeSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  tileLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.ink,
    textAlign: 'center',
    lineHeight: 14,
  },
  pressed: {
    opacity: 0.85,
  },
});
