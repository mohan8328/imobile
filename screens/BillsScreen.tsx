import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useBanking } from '../context/BankingContext';
import { fetchJson } from '../services/fetchJson';
import { colors } from '../theme/colors';

type Created = { id: number };

export function BillsScreen() {
  const { snapshot } = useBanking();
  const [payingId, setPayingId] = useState<string | null>(null);

  const pay = async (id: string, name: string, amount: number) => {
    setPayingId(id);
    try {
      const json = await fetchJson<Created>('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: `Bill payment · ${name}`,
          body: `Amount ₹${amount}`,
          userId: 1,
        }),
      });
      Alert.alert('Bill queued (demo)', `${name} · ₹${amount}\nGateway ref #${json.id}`);
    } catch (e) {
      Alert.alert('Failed', e instanceof Error ? e.message : 'Error');
    } finally {
      setPayingId(null);
    }
  };

  return (
    <FlatList
      contentContainerStyle={styles.list}
      data={snapshot.billers}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <Text style={styles.header}>Billers from your remote banking.json · payment POST is a demo API.</Text>
      }
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.meta}>
            {item.category}
            {item.consumerNo ? ` · ${item.consumerNo}` : ''}
          </Text>
          <Text style={styles.amount}>₹{item.amountDue.toLocaleString('en-IN')}</Text>
          <Pressable
            style={styles.pay}
            disabled={payingId !== null}
            onPress={() => pay(item.id, item.name, item.amountDue)}
          >
            {payingId === item.id ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              <Text style={styles.payText}>Pay now</Text>
            )}
          </Pressable>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: 16, paddingBottom: 40 },
  header: { fontSize: 13, color: colors.muted, marginBottom: 12, lineHeight: 18 },
  card: {
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.line,
  },
  name: { fontSize: 17, fontWeight: '700', color: colors.ink },
  meta: { fontSize: 13, color: colors.muted, marginTop: 4 },
  amount: { fontSize: 20, fontWeight: '700', color: colors.orangeDark, marginTop: 10 },
  pay: {
    marginTop: 12,
    backgroundColor: colors.maroon,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  payText: { color: colors.white, fontWeight: '700' },
});
