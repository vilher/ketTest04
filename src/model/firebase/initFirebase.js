import {getApp, getApps, initializeApp} from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  getReactNativePersistence,
  initializeAuth,
} from 'firebase/auth';

import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {getFirestore} from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: 'AIzaSyAnNFniy9-R0stG7USSeb-JQCbnnr2tmuQ',
  authDomain: 'egzaminnaprawojazdy.firebaseapp.com',
  projectId: 'egzaminnaprawojazdy',
  storageBucket: 'egzaminnaprawojazdy.appspot.com',
  messagingSenderId: '28480441353',
  appId: '1:28480441353:web:42a39f51eba0f58e857cd8',
};

let app;
let db;
let authenticate;

// if (!getApps().length) {

app = initializeApp(firebaseConfig);
db = getFirestore();
// authenticate = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage),
// });
// } else {
//   app = getApp();
//   db = getFirestore(app);
// }

export {app, db, authenticate};
