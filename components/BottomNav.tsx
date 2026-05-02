import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';

export type TabKey = 'home' | 'pay' | 'services' | 'cards' | 'menu';

const TABS: {
  key: TabKey;
  label: string;
  icon: ComponentProps<typeof Ionicons>['name'];
  iconActive: ComponentProps<typeof Ionicons>['name'];
}[] = [
  { key: 'home', label: 'Home', icon: 'home-outline', iconActive: 'home' },
  { key: 'pay', label: 'Pay', icon: 'wallet-outline', iconActive: 'wallet' },
  { key: 'services', label: 'Services', icon: 'grid-outline', iconActive: 'grid' },
  { key: 'cards', label: 'Cards', icon: 'card-outline', iconActive: 'card' },
  { key: 'menu', label: 'Menu', icon: 'menu-outline', iconActive: 'menu' },
];

type Props = {
  active: TabKey;
  onChange: (k: TabKey) => void;
};

export function BottomNav({ active, onChange }: Props) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom, 10) }]}>
      {TABS.map((t) => {
        const isOn = active === t.key;
        return (
          <Pressable key={t.key} style={styles.item} onPress={() => onChange(t.key)}>
            <Ionicons name={isOn ? t.iconActive : t.icon} size={22} color={isOn ? colors.orange : colors.muted} />
            <Text style={[styles.label, isOn && styles.labelOn]}>{t.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.line,
    paddingTop: 8,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
  },
  label: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.muted,
  },
  labelOn: {
    color: colors.orange,
  },
});
