// import React, {memo, useEffect, useMemo, useState} from 'react';
// import {
//   View,
//   Text,
//   Dimensions,
//   ScrollView,
//   Image,
//   TouchableOpacity,
//   FlatList,
//   VirtualizedList,
//   SectionList,
//   Appearance as getAppearance,
// } from 'react-native';
// import {
//   Surface,
//   PaperProvider,
//   Card,
//   DefaultTheme,
//   Button,
//   useTheme,
//   ProgressBar,
// } from 'react-native-paper';
// import {connect, useSelector} from 'react-redux';
// import {mapDispatchToProps} from '../model/redux/store';
// import {
//   categoriesTitle,
//   categoriesTitlte2,
//   welcomeTitle,
// } from '../model/redux/state/titleText';
// import getIcons from '../model/images/getIcons';
// import {Categories} from '../model/redux/state/Categories';
// import IconsName from '../model/images/IconsName';
// import {Theme} from '../model/redux/state/Theme';
// import {realmDb} from '../model/realm/initRealm';
// import {TablesName} from '../model/realm/question';
// import {navigate} from '../model/navigation/rootNavigation';
// import {getQuestions} from '../../Main';
// import MainHeader from './components/mainHeader';
// import RulesMain from './components/rulesMain';
// import {UserTable} from '../model/realm/user';

// const {height, width} = Dimensions.get('screen');

//   // useEffect(() => {
//   //   // getQuestions(category.toUpperCase()).then(data => {
//   //   //   set_test(data);
//   //   // });

//   //   if (
//   //     appearance == 'half-moon' ||
//   //     getAppearance.getColorScheme() != 'light'
//   //   ) {
//   //     set_dark();
//   //   }
//   // }, [category]);

//   return (

//   );
// }

// const storeState = (state, state2) => {
//   return {
//     // testsLength: state.user.tests.length,
//     correct: [],
//     incorrect: [],
//     likes: [],
//     // navigation: state2.navigation,
//     // category: state.user.category,
//     // appearance: state.user.appearance,
//     // likes: Object.keys(state.user.likes).length,
//     // color: state.colors.text,
//     // correct: state.user.correct.length,
//     // incorrect: state.user.incorrect.length,
//   };
// };

// export default connect(storeState, mapDispatchToProps)(memo(MainScreen));

// {
//   /* <VirtualizedList
//             horizontal
//             initialNumToRender={3}
//             // maxToRenderPerBatch={3}
//             // windowSize={3}
//             getItemCount={5}
//             showsHorizontalScrollIndicator={false}
//             data={Theme.slice(0, Theme.length / 2)}
//             contentContainerStyle={{
//               paddingVertical: 10,
//             }}
//             renderItem={({item, index}) => {
//               return (
//                 <Card
//                   disabled
//                   style={{
//                     backgroundColor: theme.colors.card,
//                     width: width / 2.5,
//                     height: width / 1.7,
//                     marginRight: 10,
//                     marginLeft: 2,
//                   }}>
//                   <Cardes
//                     anweredLength={65}
//                     questionLength={543}
//                     icon={item.key}
//                     texty={item[user.language]}></Cardes>
//                 </Card>
//               );
//             }}
//           /> */
// }
