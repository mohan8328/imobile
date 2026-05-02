import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BottomNav, TabKey } from '../components/BottomNav';
import { CreditCardSection } from '../components/CreditCardSection';
import { HomeHeader } from '../components/HomeHeader';
import { QuickPayRow } from '../components/QuickPayRow';
import { SavingsAccountCard } from '../components/SavingsAccountCard';
import { SearchPill } from '../components/SearchPill';
import { useBanking } from '../context/BankingContext';
import { CardsHubScreen } from '../screens/CardsHubScreen';
import { MenuScreen } from '../screens/MenuScreen';
import { PayHubScreen } from '../screens/PayHubScreen';
import { ServicesHubScreen } from '../screens/ServicesHubScreen';
import { colors } from '../theme/colors';
import { useRootNavigation } from './useRootNavigation';

export function MainShell() {
  const [tab, setTab] = useState<TabKey>('home');
  const navigation = useRootNavigation();
  const { source, loadError, refresh } = useBanking();

  return (
    <View style={styles.root}>
      <StatusBar style={tab === 'home' ? 'light' : 'dark'} />

      <View style={styles.body}>
        {tab === 'home' ? (
          <>
            <HomeHeader
              onBell={() => navigation.navigate('Notifications')}
              onProfile={() => navigation.navigate('Profile')}
            />
            {source === 'fallback' && loadError ? (
              <Pressable style={styles.banner} onPress={() => refresh()}>
                <Text style={styles.bannerText}>
                  Using bundled backup · couldn’t refresh ({loadError}). Tap to retry.
                </Text>
              </Pressable>
            ) : null}
            <ScrollView
              style={styles.scroll}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              bounces
            >
              <SearchPill onPress={() => navigation.navigate('Search')} />
              <QuickPayRow />

              <Text style={styles.sectionHeading}>Your accounts</Text>
              <SavingsAccountCard />

              <Text style={styles.sectionHeading}>Your cards</Text>
              <CreditCardSection />
            </ScrollView>
          </>
        ) : tab === 'pay' ? (
          <PayHubScreen />
        ) : tab === 'services' ? (
          <ServicesHubScreen />
        ) : tab === 'cards' ? (
          <CardsHubScreen />
        ) : (
          <MenuScreen />
        )}
      </View>

      <BottomNav active={tab} onChange={setTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.pageBg,
  },
  body: {
    flex: 1,
  },
  banner: {
    backgroundColor: '#FFF8E1',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#FFE082',
  },
  bannerText: {
    fontSize: 12,
    color: '#5D4037',
    textAlign: 'center',
  },
  scroll: {
    flex: 1,
    backgroundColor: colors.pageBg,
  },
  scrollContent: {
    paddingTop: 4,
    paddingBottom: 16,
    flexGrow: 1,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.ink,
    marginLeft: 20,
    marginBottom: 10,
    marginTop: 16,
  },
});
