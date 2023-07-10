import {SafeAreaView, StyleSheet, useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import * as eva from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {ApplicationProvider, IconRegistry, Text} from '@ui-kitten/components';

import {NavigationContainer} from '@react-navigation/native';

//Realm
import {
  RealmProvider,
  useRealm,
  useObject,
  useQuery,
} from './src/realm/context/RealmContext';
import {AppProvider, UserProvider, useUser} from '@realm/react';
import Login from './src/components/Login/Login';
import Stack from './src/navigation/Stack/Stack';
import Registration from './src/components/Registration/Registration';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const App = (): JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        {...eva}
        theme={isDarkMode ? {...eva.dark} : {...eva.light}}>
        <SafeAreaProvider style={styles.root}>
          <AppProvider id="YOUR APP ID">
            <NavigationContainer>
              <UserProvider fallback={Login}>
                <RealmProvider
                  sync={{
                    flexible: true,
                    initialSubscriptions:{
                      update(subs, realm) {
                        subs.add(realm.objects('Favorites'))
                      },
                    },
                    onError: (error: any) => console.error('Error', error),
                  }}>
                  <Stack />
                </RealmProvider>
              </UserProvider>
            </NavigationContainer>
          </AppProvider>
        </SafeAreaProvider>
      </ApplicationProvider>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default App;
