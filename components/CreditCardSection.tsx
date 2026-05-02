import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { MOCK_CREDIT_CARD } from '../data/mockData';
import { colors } from '../theme/colors';

function formatInr(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function CreditCardSection() {
  const c = MOCK_CREDIT_CARD;

  const onManage = () => {
    Alert.alert('Manage', 'Manage credit card (demo — connect flows later).');
  };

  const onViewDetails = () => {
    Alert.alert(
      'Credit card details',
      `${c.cardName}\n${c.maskedNumber}\nLimit: ${formatInr(c.creditLimit)}\nOutstanding: ${formatInr(c.outstanding)}`,
    );
  };

  return (
    <View style={styles.card}>
      <Text style={styles.label}>Credit card</Text>
      <Text style={styles.title}>{c.cardName}</Text>
      <Text style={styles.masked}>{c.maskedNumber}</Text>

      <View style={styles.metrics}>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Credit limit</Text>
          <Text style={styles.metricValue}>{formatInr(c.creditLimit)}</Text>
        </View>
        <View style={styles.metricDivider} />
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Outstanding</Text>
          <Text style={styles.metricValueOutstanding}>{formatInr(c.outstanding)}</Text>
        </View>
      </View>

      <View style={styles.actions}>
        <Pressable
          style={({ pressed }) => [styles.actionBtn, styles.actionSecondary, pressed && styles.pressed]}
          onPress={onManage}
        >
          <Text style={styles.actionSecondaryText}>Manage</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [styles.actionBtn, styles.actionPrimary, pressed && styles.pressed]}
          onPress={onViewDetails}
        >
          <Text style={styles.actionPrimaryText}>View credit card details</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.maroon,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  label: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.75)',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 6,
  },
  masked: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.9)',
    fontVariant: ['tabular-nums'],
    letterSpacing: 1,
    marginBottom: 18,
  },
  metrics: {
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  metric: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  metricDivider: {
    width: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(255,255,255,0.25)',
    marginVertical: 4,
  },
  metricLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.75)',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 17,
    fontWeight: '700',
    color: '#fff',
    fontVariant: ['tabular-nums'],
  },
  metricValueOutstanding: {
    fontSize: 17,
    fontWeight: '700',
    color: '#A5D6A7',
    fontVariant: ['tabular-nums'],
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  actionBtn: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionSecondary: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
  },
  actionPrimary: {
    backgroundColor: '#fff',
  },
  actionSecondaryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  actionPrimaryText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.maroon,
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.85,
  },
});
