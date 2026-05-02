import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import type { BankingSnapshot } from '../types/bankingSnapshot';
import { loadBankingSnapshot } from '../services/loadBankingSnapshot';
import { colors } from '../theme/colors';

type Ctx = {
  snapshot: BankingSnapshot;
  source: 'remote' | 'fallback';
  loadError?: string;
  refresh: () => Promise<void>;
};

const BankingContext = createContext<Ctx | null>(null);

export function BankingProvider({ children }: { children: ReactNode }) {
  const [snapshot, setSnapshot] = useState<BankingSnapshot | null>(null);
  const [source, setSource] = useState<'remote' | 'fallback'>('remote');
  const [loadError, setLoadError] = useState<string | undefined>();
  const refresh = useCallback(async () => {
    const r = await loadBankingSnapshot();
    setSnapshot(r.data);
    setSource(r.source);
    setLoadError(r.error);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const value = useMemo<Ctx | null>(() => {
    if (!snapshot) return null;
    return { snapshot, source, loadError, refresh };
  }, [snapshot, source, loadError, refresh]);

  if (!value) {
    return (
      <View style={styles.boot}>
        <ActivityIndicator size="large" color={colors.orange} />
        <Text style={styles.bootText}>Loading profile…</Text>
      </View>
    );
  }

  return <BankingContext.Provider value={value}>{children}</BankingContext.Provider>;
}

export function useBanking() {
  const ctx = useContext(BankingContext);
  if (!ctx) {
    throw new Error('useBanking must be used inside BankingProvider');
  }
  return ctx;
}

const styles = StyleSheet.create({
  boot: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.pageBg,
    gap: 12,
  },
  bootText: {
    fontSize: 15,
    color: colors.muted,
  },
});
