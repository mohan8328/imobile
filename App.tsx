import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BankingProvider } from './context/BankingContext';
import { RootNavigator } from './navigation/RootNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <BankingProvider>
        <RootNavigator />
      </BankingProvider>
    </SafeAreaProvider>
  );
}
