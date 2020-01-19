import AsyncStorage from '@react-native-community/async-storage';
import {StoreProvider} from 'easy-peasy';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {getStackNavigator} from './src/libs/routes';
import {store} from './src/store/state';

const App = () => {
  const [initialScreen, setInitialScreen] = useState();

  useEffect(() => {
    const storage = AsyncStorage.getItem('token');

    storage.then((tokenData: any) => {
      if (tokenData) {
        setInitialScreen('Auth');
      } else {
        setInitialScreen('Guest');
      }
    });
  }, []);

  if (initialScreen) {
    const AppNavigator = getStackNavigator(initialScreen);
    const InitialScreen = createAppContainer(AppNavigator);

    return (
      <StoreProvider store={store}>
        <InitialScreen />
      </StoreProvider>
    );
  }

  return <ActivityIndicator size="small" style={styles.loading} />;
};

const styles = StyleSheet.create({
  loading: {flex: 1, justifyContent: 'center'},
});

export default App;
