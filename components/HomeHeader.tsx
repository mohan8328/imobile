import { Ionicons } from '@expo/vector-icons';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useBanking } from '../context/BankingContext';
import { colors } from '../theme/colors';

const LOGO = require('../assets/imobile-logo.png');

type Props = {
  onBell?: () => void;
  onProfile?: () => void;
};

export function HomeHeader({ onBell, onProfile }: Props) {
  const insets = useSafeAreaInsets();
  const { snapshot, source } = useBanking();

  return (
    <View style={[styles.wrap, { paddingTop: insets.top + 8 }]}>
      <View style={styles.row}>
        <View style={styles.greeting}>
          <Text style={styles.hi}>Hi {snapshot.user.firstName}</Text>
          <Text style={styles.welcome}>Welcome to iMobile Pay</Text>
          {source === 'remote' ? (
            <Text style={styles.sync}>Profile synced from internet</Text>
          ) : null}
        </View>
        <View style={styles.icons}>
          <Pressable style={styles.iconHit} onPress={onBell} hitSlop={8}>
            <Ionicons name="notifications-outline" size={24} color={colors.white} />
          </Pressable>
          <Pressable style={styles.iconHit} onPress={onProfile} hitSlop={8}>
            <Ionicons name="person-circle-outline" size={28} color={colors.white} />
          </Pressable>
        </View>
      </View>
      <View style={styles.brandRow}>
        <Image source={LOGO} style={styles.logo} resizeMode="contain" accessibilityLabel="iMobile logo" />
        <Text style={styles.brand}>ICICI Bank</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: colors.orange,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  greeting: {
    flex: 1,
  },
  hi: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.white,
  },
  welcome: {
    marginTop: 4,
    fontSize: 14,
    color: 'rgba(255,255,255,0.92)',
  },
  sync: {
    marginTop: 6,
    fontSize: 11,
    color: 'rgba(255,255,255,0.85)',
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  iconHit: {
    padding: 6,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
    gap: 12,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: colors.white,
  },
  brand: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.white,
    letterSpacing: 0.3,
  },
});
