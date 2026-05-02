import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useBanking } from '../context/BankingContext';
import { fetchJson } from '../services/fetchJson';
import { colors } from '../theme/colors';

type Created = { id: number };

export function CardManageScreen() {
  const { snapshot } = useBanking();

  const runAction = async (title: string) => {
    try {
      const json = await fetchJson<Created>('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: `Card action · ${title}`,
          body: snapshot.creditCard.maskedNumber,
          userId: 1,
        }),
      });
      Alert.alert('Request logged (demo)', `${title}\nService ref #${json.id}`);
    } catch (e) {
      Alert.alert('Failed', e instanceof Error ? e.message : 'Error');
    }
  };

  return (
    <FlatList
      contentContainerStyle={styles.list}
      data={snapshot.manageCardActions}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <Text style={styles.header}>Actions configured in banking.json · each tap POSTs to a test API.</Text>
      }
      renderItem={({ item }) => (
        <Pressable style={styles.card} onPress={() => runAction(item.title)}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.sub}>{item.subtitle}</Text>
        </Pressable>
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
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.line,
  },
  title: { fontSize: 16, fontWeight: '700', color: colors.ink },
  sub: { fontSize: 14, color: colors.muted, marginTop: 4 },
});
