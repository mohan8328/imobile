import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useBanking } from '../context/BankingContext';
import { useRootNavigation } from '../navigation/useRootNavigation';
import { colors } from '../theme/colors';

function inr(n: number) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
}

export function CardsHubScreen() {
  const { snapshot } = useBanking();
  const navigation = useRootNavigation();
  const c = snapshot.creditCard;

  return (
    <ScrollView contentContainerStyle={styles.wrap}>
      <View style={styles.hero}>
        <Text style={styles.heroLabel}>Credit card</Text>
        <Text style={styles.heroTitle}>{c.cardName}</Text>
        <Text style={styles.mask}>{c.maskedNumber}</Text>
        <View style={styles.row}>
          <View>
            <Text style={styles.muted}>Limit</Text>
            <Text style={styles.val}>{inr(c.creditLimit)}</Text>
          </View>
          <View>
            <Text style={styles.muted}>Outstanding</Text>
            <Text style={styles.val}>{inr(c.outstanding)}</Text>
          </View>
        </View>
      </View>
      <Pressable style={styles.btn} onPress={() => navigation.navigate('CardDetails')}>
        <Text style={styles.btnText}>View credit card details</Text>
      </Pressable>
      <Pressable style={[styles.btn, styles.btnAlt]} onPress={() => navigation.navigate('CardManage')}>
        <Text style={[styles.btnText, styles.btnAltText]}>Manage card</Text>
      </Pressable>
      <Text style={styles.note}>Card fields sync from banking.json (GitHub raw when online).</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrap: { padding: 16, paddingBottom: 40, backgroundColor: colors.pageBg },
  hero: {
    backgroundColor: colors.maroon,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  heroLabel: { fontSize: 12, color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase' },
  heroTitle: { fontSize: 18, fontWeight: '700', color: '#fff', marginTop: 6 },
  mask: { fontSize: 15, color: 'rgba(255,255,255,0.95)', marginTop: 8, letterSpacing: 1 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 18,
    paddingTop: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(255,255,255,0.25)',
  },
  muted: { fontSize: 12, color: 'rgba(255,255,255,0.75)' },
  val: { fontSize: 17, fontWeight: '700', color: '#fff', marginTop: 4 },
  btn: {
    backgroundColor: colors.orange,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  btnText: { color: colors.white, fontWeight: '700', fontSize: 16 },
  btnAlt: { backgroundColor: colors.white, borderWidth: 2, borderColor: colors.orange },
  btnAltText: { color: colors.orange },
  note: { marginTop: 12, fontSize: 12, color: colors.muted, lineHeight: 18 },
});
