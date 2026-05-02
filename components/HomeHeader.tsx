import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MOCK_USER } from '../data/mockData';
import { colors } from '../theme/colors';

type Props = {
  onBell?: () => void;
  onProfile?: () => void;
};

export function HomeHeader({ onBell, onProfile }: Props) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.wrap, { paddingTop: insets.top + 8 }]}>
      <View style={styles.row}>
        <View style={styles.greeting}>
          <Text style={styles.hi}>Hi {MOCK_USER.firstName}</Text>
          <Text style={styles.welcome}>Welcome to iMobile Pay</Text>
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
        <View style={styles.logoChip}>
          <Text style={styles.logoI}>i</Text>
        </View>
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
    gap: 10,
  },
  logoChip: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoI: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.orange,
  },
  brand: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.white,
    letterSpacing: 0.3,
  },
});
