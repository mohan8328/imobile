import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { fetchJson } from '../services/fetchJson';
import { colors } from '../theme/colors';

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
};

type ProductsRes = { products: Product[] };

export function ServicesHubScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const json = await fetchJson<ProductsRes>('https://dummyjson.com/products?limit=12');
        if (!cancelled) setProducts(json.products ?? []);
      } catch (e) {
        if (!cancelled) setErr(e instanceof Error ? e.message : 'Failed');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={colors.orange} size="large" />
      </View>
    );
  }

  if (err) {
    return (
      <View style={styles.center}>
        <Text style={styles.err}>{err}</Text>
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={styles.list}
      data={products}
      keyExtractor={(item) => String(item.id)}
      ListHeaderComponent={
        <Text style={styles.header}>Offers-style grid · live product feed from dummyjson.com</Text>
      }
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image source={{ uri: item.thumbnail }} style={styles.thumb} />
          <View style={styles.body}>
            <Text style={styles.title} numberOfLines={2}>
              {item.title}
            </Text>
            <Text style={styles.price}>${item.price}</Text>
            <Text style={styles.desc} numberOfLines={2}>
              {item.description}
            </Text>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.pageBg,
    padding: 24,
  },
  err: { color: colors.maroon, textAlign: 'center' },
  list: { padding: 16, paddingBottom: 40 },
  header: { fontSize: 13, color: colors.muted, marginBottom: 12, lineHeight: 18 },
  card: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.line,
  },
  thumb: { width: 88, height: 88, backgroundColor: colors.line },
  body: { flex: 1, padding: 12 },
  title: { fontSize: 15, fontWeight: '700', color: colors.ink },
  price: { marginTop: 4, fontWeight: '700', color: colors.orange },
  desc: { marginTop: 6, fontSize: 13, color: colors.muted },
});
