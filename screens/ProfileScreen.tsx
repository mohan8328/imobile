import { CommonActions, useNavigation } from '@react-navigation/native';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useBanking } from '../context/BankingContext';
import { colors } from '../theme/colors';

function initialsFromName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export function ProfileScreen() {
  const navigation = useNavigation();
  const { snapshot } = useBanking();
  const u = snapshot.user;

  const displayName = u.fullName?.trim() || u.firstName;
  const place = u.place?.trim() || '—';

  const logout = () => {
    Alert.alert('Log out', 'Return to Home? (Demo app — no bank session is stored.)', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log out',
        style: 'destructive',
        onPress: () => {
          navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'Main' }] }));
        },
      },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.wrap} keyboardShouldPersistTaps="handled">
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{initialsFromName(displayName)}</Text>
      </View>
      <Text style={styles.name}>{displayName}</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Place</Text>
        <Text style={styles.value}>{place}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Customer ID</Text>
        <Text style={styles.value}>{u.customerId}</Text>
      </View>
      {u.email ? (
        <View style={styles.card}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{u.email}</Text>
        </View>
      ) : null}
      {u.mobile ? (
        <View style={styles.card}>
          <Text style={styles.label}>Mobile</Text>
          <Text style={styles.value}>{u.mobile}</Text>
        </View>
      ) : null}
      <Text style={styles.hint}>
        Edit name, place, email, and mobile in mock-api/banking.json (or your hosted JSON) — then refresh the app.
      </Text>
      <Pressable style={({ pressed }) => [styles.logout, pressed && styles.logoutPressed]} onPress={logout}>
        <Text style={styles.logoutText}>Log out</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrap: {
    padding: 24,
    paddingBottom: 40,
    backgroundColor: colors.pageBg,
    alignItems: 'stretch',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.maroon,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: '800',
    color: colors.white,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.ink,
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.line,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  value: {
    fontSize: 16,
    color: colors.ink,
    lineHeight: 22,
  },
  hint: {
    fontSize: 12,
    color: colors.muted,
    lineHeight: 18,
    marginTop: 8,
    marginBottom: 24,
    textAlign: 'center',
  },
  logout: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.maroon,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutPressed: {
    opacity: 0.88,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.maroon,
  },
});
