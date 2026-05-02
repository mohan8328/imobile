import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { fetchJson } from '../services/fetchJson';
import { colors } from '../theme/colors';

type CreatedPost = { id: number };

export function SendMoneyScreen() {
  const [payee, setPayee] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    if (!payee.trim() || !amount.trim()) {
      Alert.alert('Missing fields', 'Enter payee UPI / account hint and amount.');
      return;
    }
    setBusy(true);
    try {
      const body = {
        title: 'Fund transfer request',
        body: `${payee.trim()} | ₹${amount.trim()} | ${note}`,
        userId: 1,
      };
      const json = await fetchJson<CreatedPost>('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      Alert.alert(
        'Submitted over the network',
        `Placeholder API returned reference id ${json.id}. This is not a real transfer.`,
      );
      setPayee('');
      setAmount('');
      setNote('');
    } catch (e) {
      Alert.alert('Request failed', e instanceof Error ? e.message : 'Unknown error');
    } finally {
      setBusy(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.wrap} keyboardShouldPersistTaps="handled">
      <Text style={styles.label}>Payee (UPI ID / masked account)</Text>
      <TextInput
        style={styles.input}
        value={payee}
        onChangeText={setPayee}
        placeholder="name@upi or beneficiary name"
        placeholderTextColor={colors.muted}
        autoCapitalize="none"
      />
      <Text style={styles.label}>Amount (INR)</Text>
      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
        placeholder="0.00"
        placeholderTextColor={colors.muted}
        keyboardType="decimal-pad"
      />
      <Text style={styles.label}>Note (optional)</Text>
      <TextInput
        style={[styles.input, styles.note]}
        value={note}
        onChangeText={setNote}
        placeholder="Rent, gift, etc."
        placeholderTextColor={colors.muted}
      />
      <Pressable style={[styles.btn, busy && styles.btnDisabled]} onPress={submit} disabled={busy}>
        {busy ? (
          <ActivityIndicator color={colors.white} />
        ) : (
          <Text style={styles.btnText}>Send · POST to JSONPlaceholder</Text>
        )}
      </Pressable>
      <Text style={styles.disclaimer}>
        Uses a public test API; only proves network round-trip — use bank rails for real money.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrap: { padding: 20, paddingBottom: 40, backgroundColor: colors.pageBg },
  label: { fontSize: 13, fontWeight: '600', color: colors.muted, marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    backgroundColor: colors.white,
    color: colors.ink,
    marginBottom: 16,
  },
  note: { minHeight: 72, textAlignVertical: 'top' },
  btn: {
    backgroundColor: colors.orange,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  btnDisabled: { opacity: 0.7 },
  btnText: { color: colors.white, fontWeight: '700', fontSize: 16 },
  disclaimer: { marginTop: 16, fontSize: 12, color: colors.muted, lineHeight: 18 },
});
