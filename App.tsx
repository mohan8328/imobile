import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BottomNav, TabKey } from './components/BottomNav';
import { CreditCardSection } from './components/CreditCardSection';
import { HomeHeader } from './components/HomeHeader';
import { QuickPayRow } from './components/QuickPayRow';
import { SavingsAccountCard } from './components/SavingsAccountCard';
import { SearchPill } from './components/SearchPill';
import { TabPlaceholder } from './components/TabPlaceholder';
import { colors } from './theme/colors';

const TAB_TITLE: Record<Exclude<TabKey, 'home'>, string> = {
  pay: 'Pay & transfer',
  services: 'Services',
  cards: 'Cards hub',
  menu: 'Menu',
};

export default function App() {
  const [tab, setTab] = useState<TabKey>('home');

  return (
    <SafeAreaProvider>
      <View style={styles.root}>
        <StatusBar style={tab === 'home' ? 'light' : 'dark'} />

        <View style={styles.body}>
          {tab === 'home' ? (
            <>
              <HomeHeader
                onBell={() => Alert.alert('Notifications', 'Demo — no alerts yet.')}
                onProfile={() => Alert.alert('Profile', 'Demo — settings / profile later.')}
              />
              <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                bounces
              >
                <SearchPill onPress={() => Alert.alert('Search', 'Demo — search services & payees.')} />
                <QuickPayRow />

                <Text style={styles.sectionHeading}>Your accounts</Text>
                <SavingsAccountCard />

                <Text style={styles.sectionHeading}>Your cards</Text>
                <CreditCardSection />
              </ScrollView>
            </>
          ) : (
            <View style={styles.otherWrap}>
              <TabPlaceholder title={TAB_TITLE[tab]} />
            </View>
          )}
        </View>

        <BottomNav active={tab} onChange={setTab} />
      </View>
    </SafeAreaProvider>
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
  otherWrap: {
    flex: 1,
    backgroundColor: colors.pageBg,
  },
});
