import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import { fetchJson } from '../services/fetchJson';
import { colors } from '../theme/colors';

type RandomUserResponse = {
  results: {
    name: { title: string; first: string; last: string };
    email: string;
    phone: string;
    picture: { large: string };
    location: { city: string; country: string };
  }[];
};

export function ProfileScreen() {
  const [data, setData] = useState<RandomUserResponse['results'][0] | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const json = await fetchJson<RandomUserResponse>('https://randomuser.me/api/?nat=in');
        if (!cancelled && json.results[0]) setData(json.results[0]);
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

  if (err || !data) {
    return (
      <View style={styles.center}>
        <Text style={styles.err}>{err ?? 'No profile data'}</Text>
      </View>
    );
  }

  const fullName = `${data.name.title} ${data.name.first} ${data.name.last}`;

  return (
    <View style={styles.wrap}>
      <Image source={{ uri: data.picture.large }} style={styles.photo} />
      <Text style={styles.name}>{fullName}</Text>
      <Text style={styles.row}>✉ {data.email}</Text>
      <Text style={styles.row}>☎ {data.phone}</Text>
      <Text style={styles.row}>
        📍 {data.location.city}, {data.location.country}
      </Text>
      <Text style={styles.note}>Sample identity from randomuser.me (internet).</Text>
    </View>
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
  wrap: {
    flex: 1,
    backgroundColor: colors.pageBg,
    padding: 24,
    alignItems: 'center',
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    backgroundColor: colors.line,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.ink,
    marginBottom: 12,
    textAlign: 'center',
  },
  row: { fontSize: 15, color: colors.muted, marginBottom: 6, textAlign: 'center' },
  note: {
    marginTop: 24,
    fontSize: 12,
    color: colors.muted,
    textAlign: 'center',
    lineHeight: 18,
  },
});
