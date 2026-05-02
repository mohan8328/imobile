import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { CreditCardSection } from './components/CreditCardSection';
import { SavingsAccountCard } from './components/SavingsAccountCard';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safe} edges={['top', 'left', 'right', 'bottom']}>
        <StatusBar style="dark" />
        <View style={styles.header}>
          <View style={styles.logoMark}>
            <Text style={styles.logoText}>i</Text>
          </View>
          <View>
            <Text style={styles.appName}>iMobile Pay</Text>
            <Text style={styles.bankName}>ICICI Bank</Text>
          </View>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          bounces
        >
          <Text style={styles.sectionHeading}>Your accounts</Text>
          <SavingsAccountCard />

          <Text style={styles.sectionHeading}>Cards</Text>
          <CreditCardSection />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E5E5',
    gap: 12,
  },
  logoMark: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#C62828',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#fff',
  },
  appName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
  },
  bankName: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 20,
    paddingBottom: 28,
    flexGrow: 1,
  },
  sectionHeading: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginLeft: 24,
    marginBottom: 10,
    marginTop: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
