/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {Provider as StoreProvider, useDispatch, useSelector} from 'react-redux';
import React, {useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import store from './src/model/redux/store';
import {db, app, authenticate} from './src/model/firebase/initFirebase';
import {collection, getDoc, getDocs} from 'firebase/firestore/lite';
import {realmDb} from './src/model/realm/initRealm';
import {TablesName} from './src/model/realm/question';
import Main from './Main';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './src/model/navigation/rootNavigation';

function Appearance({children}) {
  console.log('appeearance tsx');
  const colors = useSelector(
    state => {
      return {
        colors: state.colors,
      };
    },
    {
      equalityFn: (a, b) => {
        return a.colors.dark == b.colors.dark;
      },
    },
  );

  return (
    <>
      {/* <StatusBar barStyle={themeR.dark ? 'dark-content' : 'light-content'} /> */}
      <PaperProvider theme={colors}>
        <NavigationContainer ref={navigationRef} theme={colors}>
          {children}
        </NavigationContainer>
      </PaperProvider>
    </>
  );
}

function App(): React.JSX.Element {
  return (
    <StoreProvider store={store}>
      <Appearance>
        <GestureHandlerRootView style={{flex: 1}}>
          <Main></Main>
        </GestureHandlerRootView>
      </Appearance>
    </StoreProvider>
  );
}

export default App;
