import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useBanking } from '../context/BankingContext';
import { colors } from '../theme/colors';

function inr(n: number) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
}

export function CardDetailsScreen() {
  const { snapshot } = useBanking();
  const c = snapshot.creditCard;

  const rows: { label: string; value: string }[] = [
    { label: 'Card', value: c.cardName },
    { label: 'Number', value: c.maskedNumber },
    { label: 'Network', value: c.network ?? '—' },
    { label: 'Credit limit', value: inr(c.creditLimit) },
    { label: 'Outstanding', value: inr(c.outstanding) },
    { label: 'Minimum due', value: c.minimumDue != null ? inr(c.minimumDue) : '—' },
    { label: 'Billing cycle ends', value: c.billingCycleEnds ?? '—' },
    { label: 'Reward points', value: c.rewardPoints != null ? String(c.rewardPoints) : '—' },
    { label: 'Currency', value: c.currency },
  ];

  return (
    <ScrollView contentContainerStyle={styles.wrap}>
      <Text style={styles.note}>Values loaded from internet (banking.json) or bundled fallback.</Text>
      {rows.map((r) => (
        <View key={r.label} style={styles.row}>
          <Text style={styles.label}>{r.label}</Text>
          <Text style={styles.value}>{r.value}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrap: { padding: 20, paddingBottom: 40, backgroundColor: colors.pageBg },
  note: { fontSize: 13, color: colors.muted, marginBottom: 16, lineHeight: 18 },
  row: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.line,
  },
  label: { fontSize: 12, color: colors.muted, marginBottom: 4 },
  value: { fontSize: 16, fontWeight: '600', color: colors.ink },
});
