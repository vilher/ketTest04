import React, {memo, useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Appearance as getAppearance,
  Button,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Octicons';
import {createStackNavigator} from '@react-navigation/stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Surface, PaperProvider, Card, DefaultTheme} from 'react-native-paper';

import {useTheme} from 'react-native-paper';
import {Provider as StoreProvider, useDispatch, useSelector} from 'react-redux';
import SettingsScreen from './src/view/SettingsScreen';
import Appearance from './src/view/Appearance';
import {navigationRef} from './src/model/navigation/rootNavigation';
import LanguageScreens from './src/view/LanguageScreens';
import CategoryScreens from './src/view/CategoryScreens';
import {db} from './src/model/firebase/initFirebase';
import {realmDb} from './src/model/realm/initRealm';
import {TablesName} from './src/model/realm/question';
import {collection, getDocs} from 'firebase/firestore/lite';
import TestScreen from './src/view/TestScreen';
import MainScreen from './src/view/MainScreen';
import ResultsScreen from './src/view/ResultsScreen';

const {height, width} = Dimensions.get('screen');

// function MainScreens() {
//   const theme = useTheme();
//   const dispatch = useDispatch();

//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="MainScreen"
//         component={MainScreen}
//         options={{
//           headerShown: false,
//           tabBarShowLabel: false,
//           tabBarIcon: ({color, size}) => (
//             <Icon
//               name="home"
//               size={25}
//               //  color={theme.colors.text}
//             />
//           ),
//         }}
//       />

//       <Stack.Screen
//         name="Test"
//         title={''}
//         component={TestScreen}
//         options={({navigation, route}) => ({
//           // headerStyle: {
//           //   backgroundColor: theme.colors.background,
//           // },
//           // headerTitleStyle: {
//           //   color: theme.colors.text,
//           // },
//           headerLeft: () => (
//             <TouchableOpacity
//               style={{
//                 width: 40,
//                 alignItems: 'center',
//               }}
//               onPress={() => {
//                 dispatch({
//                   type: 'CLEAR_TEST',
//                 });
//                 navigation.goBack();
//               }}>
//               <Icon2
//                 name="chevron-left"
//                 size={24}
//                 // color={theme.colors.text}
//               />
//             </TouchableOpacity>
//           ),
//         })}
//         screenOptions={{
//           gestureEnabled: true,
//           gestureDirection: 'horizontal',
//         }}
//       />
//     </Stack.Navigator>
//   );
// }

// function BottomNavigation() {
//   const themes = useSelector(state => state.colors, {
//     equalityFn: (a, b) => {
//       return a.text == b.text;
//     },
//   });
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         tabBarStyle: {
//           backgroundColor: themes.background,
//         },
//       }}>
//       <Tab.Screen
//         name="Main"
//         component={MainScreens}
//         options={{
//           headerShown: false,
//           tabBarShowLabel: false,
//           tabBarIcon: ({color, size}) => (
//             <Icon name="home" size={25} color={themes.text} />
//           ),
//         }}
//       />

//     </Tab.Navigator>
//   );
// }

// function SettingMain() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="Settingss"
//         component={SettingsScreen}
//         options={{
//           headerShown: false,
//         }}
//       />
//     </Stack.Navigator>
//   );
// }

// function Maino() {
//   const {themeR} = useSelector(
//     state => {
//       return {
//         themeR: state.colors,
//         rerendered: state.rerender.setting,
//       };
//     },
//     {
//       equalityFn: (a, b) => {
//         return a.rerendered == b.rerendered && a.themeR.text == b.themeR.text;
//       },
//     },
//   );
//   const theme = {
//     colors: themeR,
//     dark: themeR.dark,
//   };
//   // console.log(textCategory[language], '-----------');
//   return (
//     <PaperProvider theme={theme}>
//       <NavigationContainer theme={theme}>
//         <Stack.Navigator>
//           {/* <Stack.Screen
//             name="BottomNavigation"
//             component={BottomNavigation}
//             options={{
//               headerShown: false,
//             }}
//           /> */}

//           <Stack.Screen
//             name="Appearance"
//             // title={textAppearance[user.language]}
//             component={Appearance}
//             options={({navigation, route}) => ({
//               headerStyle: {
//                 backgroundColor: themes.background,
//               },
//               headerTitleStyle: {
//                 color: themes.text,
//               },
//               headerLeft: () => (
//                 <TouchableOpacity
//                   style={{
//                     width: 40,
//                     alignItems: 'center',
//                   }}
//                   onPress={() => {
//                     navigation.goBack();
//                   }}>
//                   <Icon2 name="chevron-left" size={24} color={themes.text} />
//                 </TouchableOpacity>
//               ),
//             })}
//           />

//           <Stack.Screen
//             name="Category"
//             // title={textCategory[user.language]}
//             component={CategoryScreens}
//             options={({navigation, route}) => ({
//               headerStyle: {
//                 backgroundColor: theme.colors.background,
//               },
//               headerTitleStyle: {
//                 color: theme.colors.text,
//               },
//               headerLeft: () => (
//                 <TouchableOpacity
//                   style={{
//                     width: 40,
//                     alignItems: 'center',
//                   }}
//                   onPress={() => {
//                     navigation.goBack();
//                   }}>
//                   <Icon2
//                     name="chevron-left"
//                     size={24}
//                     color={theme.colors.text}
//                   />
//                 </TouchableOpacity>
//               ),
//             })}
//           />

//           <Stack.Screen
//             name="Language"
//             component={LanguageScreens}
//             options={({navigation, route}) => {
//               return {
//                 // title: textLanguage[language],
//                 headerStyle: {
//                   backgroundColor: theme.colors.background,
//                 },
//                 headerTitleStyle: {
//                   color: theme.colors.text,
//                 },
//                 headerLeft: () => (
//                   <TouchableOpacity
//                     style={{
//                       width: 40,
//                       alignItems: 'center',
//                     }}
//                     onPress={() => {
//                       navigation.goBack();
//                     }}>
//                     <Icon2
//                       name="chevron-left"
//                       size={24}
//                       color={theme.colors.text}
//                     />
//                   </TouchableOpacity>
//                 ),
//               };
//             }}
//           />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </PaperProvider>
//   );
// }

// implementation project(':react-native-vector-icons')

// implementation project(':react-native-screens')
// implementation project(':react-native-reanimated')
// implementation project(':react-native-safe-area-context')
// apply from: file("../../node_modules/react-native-vector-icons/fonts.gradle")

export async function getQuestions(category) {
  try {
    if (category) {
      const allObjects = realmDb
        .objects(TablesName.QUESTIONS)
        .filtered(`categories = "${category}"`);
      if (allObjects.length) {
        return allObjects;
      } else {
        const citiesCol = collection(db, 'questions');

        const citySnapshot = await getDocs(citiesCol);

        console.log(citySnapshot.docs.length);
        let data = [];

        realmDb.write(() => {
          data = citySnapshot.docs.map(doc => {
            return realmDb.create(TablesName.QUESTIONS, doc.data());
          });
        });
        return data;
      }
    }
    return [];
  } catch (err) {
    console.log(err);
    return [];
  }
}
const DisplayIconH = memo(({focused}) => {
  const themes = useSelector(
    state => {
      return {
        text: `rgba(${state.colors.borderRgba},0.5)`,
        textDefault: `rgba(${state.colors.secondaryRgba})`,
        dark: state.colors.dark,
      };
    },
    {
      equalityFn: (a, b) => {
        return a.dark == b.dark;
      },
    },
  );
  return (
    <Icon
      name="home"
      size={28}
      color={focused ? themes.textDefault : themes.text}
    />
  );
});
const DisplayIconU = memo(({focused}) => {
  const themes = useSelector(
    state => {
      return {
        text: `rgba(${state.colors.borderRgba},0.5)`,
        textDefault: `rgba(${state.colors.secondaryRgba})`,
        dark: state.colors.dark,
      };
    },
    {
      equalityFn: (a, b) => {
        return a.dark == b.dark;
      },
    },
  );

  return (
    <Icon
      name="user"
      size={25}
      color={focused ? themes.textDefault : themes.text}
    />
  );
});
const SettingsStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function SettingsStackScreen() {
  console.log('setting nav');
  return (
    <SettingsStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <SettingsStack.Group>
        <SettingsStack.Screen name="Language" component={LanguageScreens} />
        <SettingsStack.Screen name="Appearance" component={Appearance} />
        <SettingsStack.Screen name="Category" component={CategoryScreens} />
        <SettingsStack.Screen name="Test" component={TestScreen} />
        <SettingsStack.Screen name="Result" component={ResultsScreen} />
      </SettingsStack.Group>
    </SettingsStack.Navigator>
  );
}

function BottomNavigation2() {
  console.log('bottomScreens');

  return (
    <Tab.Navigator
      screenOptions={({route}) => {
        return {
          tabBarStyle: {
            borderTopColor: '#D3D3D3',
          },
          headerShown: false,
        };
      }}>
      <Tab.Screen
        name="Homes"
        component={MainScreen}
        options={route => {
          return {
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: info => {
              return <DisplayIconH focused={info.focused}></DisplayIconH>;
            },
          };
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarVisible: false,
          tabBarShowLabel: false,
          tabBarIcon: info => {
            return <DisplayIconU focused={info.focused}></DisplayIconU>;
          },
          headerShown: false,
          tabBarVisible: false,
        }}
      />
    </Tab.Navigator>
  );
}

const HomeStack = createNativeStackNavigator();
function Main() {
  console.log('Main');
  return (
    <HomeStack.Navigator
      screenOptions={{
        gestureDirection: 'horizontal-inverted',
        headerShown: false,
      }}>
      <HomeStack.Screen
        name="BottomNav"
        component={BottomNavigation2}></HomeStack.Screen>
      <HomeStack.Screen
        name="MainStack"
        options={{animation: 'slide_from_right'}}
        component={SettingsStackScreen}></HomeStack.Screen>
    </HomeStack.Navigator>
  );
}

export default memo(Main);
