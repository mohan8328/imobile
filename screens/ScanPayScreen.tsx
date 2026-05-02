import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useBanking } from '../context/BankingContext';
import { colors } from '../theme/colors';

export function ScanPayScreen() {
  const { snapshot } = useBanking();
  const h = snapshot.scanPayHelp;

  return (
    <ScrollView contentContainerStyle={styles.wrap}>
      <Text style={styles.title}>{h.title}</Text>
      {h.bullets.map((b, i) => (
        <Text key={i} style={styles.bullet}>
          {i + 1}. {b}
        </Text>
      ))}
      <Pressable
        style={styles.btn}
        onPress={() => Linking.openURL(h.npciUrl)}
      >
        <Text style={styles.btnText}>Open NPCI UPI overview (web)</Text>
      </Pressable>
      <Text style={styles.note}>
        Camera-based QR capture needs native modules and permissions. This screen loads copy from your remote banking.json.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrap: { padding: 20, paddingBottom: 40, backgroundColor: colors.pageBg },
  title: { fontSize: 20, fontWeight: '700', color: colors.ink, marginBottom: 16 },
  bullet: { fontSize: 15, color: colors.muted, marginBottom: 10, lineHeight: 22 },
  btn: {
    marginTop: 16,
    backgroundColor: colors.orange,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  btnText: { color: colors.white, fontWeight: '700', fontSize: 15 },
  note: { marginTop: 20, fontSize: 12, color: colors.muted, lineHeight: 18 },
});
