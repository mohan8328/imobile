import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { fetchJson } from '../services/fetchJson';
import { colors } from '../theme/colors';

type NpmPackage = {
  package: { name: string; description: string; version: string };
};

type NpmSearchResponse = {
  objects: NpmPackage[];
};

export function SearchScreen() {
  const [q, setQ] = useState('react-native');
  const [results, setResults] = useState<NpmPackage[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const runSearch = useCallback(async (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    setLoading(true);
    setErr(null);
    try {
      const url = `https://registry.npmjs.org/-/v1/search?text=${encodeURIComponent(trimmed)}&size=20`;
      const json = await fetchJson<NpmSearchResponse>(url);
      setResults(json.objects ?? []);
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Search failed');
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <View style={styles.wrap}>
      <View style={styles.searchRow}>
        <TextInput
          style={styles.input}
          value={q}
          onChangeText={setQ}
          placeholder="Package or keyword…"
          placeholderTextColor={colors.muted}
          onSubmitEditing={() => runSearch(q)}
          returnKeyType="search"
        />
        <Pressable style={styles.go} onPress={() => runSearch(q)}>
          <Text style={styles.goText}>Search</Text>
        </Pressable>
      </View>
      <Text style={styles.hint}>Uses npm registry API over the internet.</Text>

      {loading ? (
        <ActivityIndicator style={{ marginTop: 24 }} color={colors.orange} size="large" />
      ) : null}
      {err ? <Text style={styles.err}>{err}</Text> : null}

      <FlatList
        data={results}
        keyExtractor={(item) => item.package.name}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.pkg}>{item.package.name}@{item.package.version}</Text>
            <Text style={styles.desc} numberOfLines={3}>
              {item.package.description || '—'}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: colors.pageBg, paddingTop: 12 },
  searchRow: { flexDirection: 'row', paddingHorizontal: 16, gap: 10, alignItems: 'center' },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: colors.white,
    color: colors.ink,
  },
  go: {
    backgroundColor: colors.orange,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  goText: { color: colors.white, fontWeight: '700' },
  hint: { marginHorizontal: 16, marginTop: 8, fontSize: 12, color: colors.muted },
  err: { color: colors.maroon, marginHorizontal: 16, marginTop: 8 },
  list: { padding: 16, paddingBottom: 40 },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.line,
  },
  pkg: { fontWeight: '700', color: colors.ink, marginBottom: 4 },
  desc: { fontSize: 14, color: colors.muted, lineHeight: 20 },
});
