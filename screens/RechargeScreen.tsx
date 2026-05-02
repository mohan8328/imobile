import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useBanking } from '../context/BankingContext';
import { fetchJson } from '../services/fetchJson';
import { colors } from '../theme/colors';

type Created = { id: number };

export function RechargeScreen() {
  const { snapshot } = useBanking();
  const [mobile, setMobile] = useState('');
  const [loadingOp, setLoadingOp] = useState<string | null>(null);

  const recharge = async (operatorName: string) => {
    if (!/^\d{10}$/.test(mobile.trim())) {
      Alert.alert('Invalid number', 'Enter a 10-digit mobile number.');
      return;
    }
    setLoadingOp(operatorName);
    try {
      const json = await fetchJson<Created>('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: `Recharge · ${operatorName}`,
          body: mobile.trim(),
          userId: 1,
        }),
      });
      Alert.alert('Recharge request sent (demo)', `${operatorName} · ${mobile}\nRef #${json.id}`);
    } catch (e) {
      Alert.alert('Failed', e instanceof Error ? e.message : 'Error');
    } finally {
      setLoadingOp(null);
    }
  };

  return (
    <FlatList
      contentContainerStyle={styles.list}
      data={snapshot.rechargeOperators}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <View style={styles.top}>
          <Text style={styles.label}>Mobile / subscriber number</Text>
          <TextInput
            style={styles.input}
            value={mobile}
            onChangeText={setMobile}
            placeholder="10-digit number"
            placeholderTextColor={colors.muted}
            keyboardType="phone-pad"
            maxLength={10}
          />
          <Text style={styles.hint}>Operators list from banking.json · POST proves network call.</Text>
        </View>
      }
      renderItem={({ item }) => (
        <Pressable
          style={styles.row}
          disabled={loadingOp !== null}
          onPress={() => recharge(item.name)}
        >
          <View>
            <Text style={styles.op}>{item.name}</Text>
            <Text style={styles.type}>{item.type}</Text>
          </View>
          {loadingOp === item.name ? (
            <ActivityIndicator color={colors.orange} />
          ) : (
            <Text style={styles.go}>Recharge →</Text>
          )}
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: 16, paddingBottom: 40 },
  top: { marginBottom: 16 },
  label: { fontSize: 13, fontWeight: '600', color: colors.muted, marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    backgroundColor: colors.white,
    color: colors.ink,
  },
  hint: { marginTop: 8, fontSize: 12, color: colors.muted },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.line,
  },
  op: { fontSize: 16, fontWeight: '700', color: colors.ink },
  type: { fontSize: 13, color: colors.muted, marginTop: 2 },
  go: { fontWeight: '700', color: colors.orange },
});
