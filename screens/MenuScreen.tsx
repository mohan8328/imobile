import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useBanking } from '../context/BankingContext';
import { fetchJson } from '../services/fetchJson';
import { colors } from '../theme/colors';

type ChuckJoke = { value: string };

export function MenuScreen() {
  const { snapshot } = useBanking();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const openLink = (url: string) => {
    Linking.openURL(url).catch(() => Alert.alert('Could not open link'));
  };

  const chuck = async () => {
    setLoadingId('chuck');
    try {
      const json = await fetchJson<ChuckJoke>('https://api.chucknorris.io/jokes/random');
      Alert.alert('From the internet', json.value);
    } catch (e) {
      Alert.alert('Failed', e instanceof Error ? e.message : 'Error');
    } finally {
      setLoadingId(null);
    }
  };

  const onItem = (item: (typeof snapshot.menuItems)[0]) => {
    if (item.link) {
      openLink(item.link);
      return;
    }
    if (item.action === 'chuck') {
      chuck();
      return;
    }
    if (item.action === 'about') {
      Alert.alert('About', item.subtitle);
    }
  };

  return (
    <FlatList
      contentContainerStyle={styles.list}
      data={snapshot.menuItems}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <Text style={styles.header}>Menu rows from banking.json · links open in browser.</Text>
      }
      renderItem={({ item }) => (
        <Pressable style={styles.row} onPress={() => onItem(item)}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.sub}>{item.subtitle}</Text>
          </View>
          {item.action === 'chuck' && loadingId === 'chuck' ? (
            <ActivityIndicator color={colors.orange} />
          ) : (
            <Text style={styles.chev}>›</Text>
          )}
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: 16, paddingBottom: 40 },
  header: { fontSize: 13, color: colors.muted, marginBottom: 12, lineHeight: 18 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.line,
  },
  title: { fontSize: 16, fontWeight: '700', color: colors.ink },
  sub: { fontSize: 13, color: colors.muted, marginTop: 4 },
  chev: { fontSize: 22, color: colors.orange, fontWeight: '300' },
});
