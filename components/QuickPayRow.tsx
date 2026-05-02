import { Ionicons } from '@expo/vector-icons';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';

const ACTIONS = [
  { key: 'scan', label: 'Scan & Pay', icon: 'qr-code-outline' as const, hint: 'UPI / QR payments' },
  { key: 'send', label: 'Send\nmoney', icon: 'paper-plane-outline' as const, hint: 'Transfer to bank / UPI' },
  { key: 'bills', label: 'Pay\nbills', icon: 'document-text-outline' as const, hint: 'Electricity, CC, more' },
  { key: 'recharge', label: 'Recharge', icon: 'phone-portrait-outline' as const, hint: 'Mobile & DTH' },
];

export function QuickPayRow() {
  return (
    <View style={styles.wrap}>
      <Text style={styles.sectionTitle}>Quick payments</Text>
      <View style={styles.row}>
        {ACTIONS.map((a) => (
          <Pressable
            key={a.key}
            style={({ pressed }) => [styles.tile, pressed && styles.pressed]}
            onPress={() => Alert.alert(a.label.replace('\n', ' '), `${a.hint}\n\n(Demo — not linked to real banking.)`)}
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
