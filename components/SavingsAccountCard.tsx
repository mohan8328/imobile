import { StyleSheet, Text, View } from 'react-native';
import { MOCK_SAVINGS_ACCOUNT } from '../data/mockData';

function formatInr(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(amount);
}

export function SavingsAccountCard() {
  const a = MOCK_SAVINGS_ACCOUNT;
  return (
    <View style={styles.card}>
      <Text style={styles.label}>Account</Text>
      <Text style={styles.title}>{a.accountType}</Text>
      <Text style={styles.acctNo}>{a.accountNumber}</Text>
      <View style={styles.row}>
        <Text style={styles.balanceLabel}>Available balance</Text>
        <Text style={styles.balance}>{formatInr(a.availableBalance)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  label: {
    fontSize: 12,
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 6,
  },
  acctNo: {
    fontSize: 15,
    color: '#444',
    fontVariant: ['tabular-nums'],
    marginBottom: 16,
  },
  row: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#eee',
    paddingTop: 14,
  },
  balanceLabel: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  balance: {
    fontSize: 22,
    fontWeight: '700',
    color: '#B71C1C',
    fontVariant: ['tabular-nums'],
  },
});
