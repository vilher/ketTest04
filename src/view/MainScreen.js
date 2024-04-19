import React, {memo, useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  Surface,
  PaperProvider,
  Card,
  DefaultTheme,
  Button,
} from 'react-native-paper';
import {useTheme} from 'react-native-paper';
import {connect, shallowEqual, useDispatch, useSelector} from 'react-redux';
import {mapDispatchToProps} from '../model/redux/store';
import {useFocusEffect} from '@react-navigation/native';
import MainHeader from './components/mainHeader';
import DisplayHeader from './components/displayHeader';
import getIcons from '../model/images/getIcons';
import {navigate} from '../model/navigation/rootNavigation';
import FastImage from 'react-native-fast-image';
import {getQuestions} from '../../Main';
import {set_test} from '../model/redux/actions/questions';
import {enableFreeze} from 'react-native-screens';
import RulesMain from './components/rulesMain';

const {height, width} = Dimensions.get('screen');
const CategoriesDisplay = memo(() => {
  console.log('categories');

  const {language, saved, incorrect, correct, text, card} = useSelector(
    state => {
      return {
        saved: Object.keys(state.user.likes).length,
        text: state.colors.text,
        language: state.user.language,
        incorrect: state.user.incorrect.length,
        correct: state.user.correct.length,
        card: state.colors.card,
      };
    },
    shallowEqual,
  );

  const info = [
    {
      key: 'saved',
      image: 'heart_fill',
      size: saved,
      titles: {
        EN: 'Saved',
        DE: 'Gerettet',
        PL: 'Zapisane',
      },
    },
    {
      key: 'incorrect',
      image: 'cancel',
      size: incorrect,
      titles: {
        EN: 'Incorrect',
        DE: 'Falsch',
        PL: 'Niepoprawny',
      },
    },
    {
      key: 'correct',
      image: 'checked',
      size: correct,
      titles: {
        EN: 'Correct',
        DE: 'Richtig',
        PL: 'Poprawny',
      },
    },
  ];
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingTop: 30,
        paddingBottom: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        {info.map((value, index) => {
          return (
            <Card
              key={index}
              style={{
                backgroundColor: card,
                width: width * 0.5,
                marginRight: 10,
                marginLeft: 2,
                padding: 8,
              }}>
              <TouchableOpacity
                disabled={!value.size}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  columnGap: 10,
                }}
                onPress={() => {
                  navigate('Test', {key: value.key});
                }}>
                <FastImage
                  source={getIcons(value.image)}
                  style={{
                    width: width / 9,
                    height: width / 9,
                    margin: 1,
                  }}
                />
                <Text
                  style={{
                    color: text,
                  }}>
                  {value.titles[language]}
                </Text>
                <Text
                  style={{
                    color: text,
                    textAlign: 'right',
                    fontWeight: 'bold',
                    flex: 1,
                    margin: 1,
                  }}>
                  {value.size}
                </Text>
              </TouchableOpacity>
            </Card>
          );
        })}
      </View>
    </ScrollView>
  );
});

const Themes = memo(() => {
  console.log('Themes');
  const {language, card, text} = useSelector(state => {
    return {
      language: state.user.language,
      text: state.colors.text,
      card: state.colors.card,
    };
  }, shallowEqual);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingTop: 20,
        paddingBottom: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        {[
          {
            image: IconsName.report,
            key: 'forYou',
            titles: {
              EN: 'Test',
              DE: 'Für dich',
              PL: 'Dla Ciebie',
            },
            show: true,
          },
          {
            image: IconsName.alarm_clock,
            key: 'forYouTest',
            titles: {
              EN: 'Exam',
              DE: 'Für Ihren Test',
              PL: 'Dla Ciebie Testuj',
            },
            show: true,
          },
          {
            image: IconsName.note,
            key: 'test',
            titles: {
              EN: 'Practise',
              DE: 'Prüfen',
              PL: 'Test',
            },
            show: true,
          },
          // image: IconsName.running,
        ].map((value, index) => {
          return (
            <Card
              key={index}
              style={{
                backgroundColor: card,
                marginRight: 10,
                marginLeft: 2,
                padding: 4,
                width: width / 3 - 18,
              }}>
              <TouchableOpacity
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  columnGap: 10,
                  marginVertical: 3,
                }}
                onPress={() => {
                  navigate('MainStack', {
                    screen: 'Test',
                    key: value.key,
                    params: {displayResult: true},
                  });
                }}>
                <FastImage
                  source={getIcons(value.image)}
                  style={{
                    width: width / 9,
                    height: width / 9,
                  }}
                />
                <Text
                  style={{
                    color: text,
                    paddingTop: 10,
                  }}>
                  {value.titles[language]}
                </Text>
              </TouchableOpacity>
            </Card>
          );
        })}
      </View>
    </ScrollView>
  );
});
enableFreeze(true);
function MainScreen() {
  const dispatch = useDispatch();

  const {user, theme, system} = useSelector(
    state => {
      return {
        user: state.user,
        system: state.system,
        theme: state.colors,
      };
    },
    {
      equalityFn: (a, b) => {
        return true;
      },
    },
  );

  useEffect(() => {
    getQuestions(system.category.toUpperCase()).then(data => {
      dispatch(set_test(data));
    });
    //   // if (
    //   //   appearance == 'half-moon' ||
    //   //   getAppearance.getColorScheme() != 'light'
    //   // ) {
    //   //   set_dark();
    //   // }
  }, []);

  console.log('main screen');
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: 40,
        paddingTop: 10,
      }}
      style={{
        height,
        paddingHorizontal: 10,
        paddingTop: 40,
      }}>
      <MainHeader></MainHeader>
      <CategoriesDisplay></CategoriesDisplay>

      <Themes></Themes>
      <RulesMain></RulesMain>
    </ScrollView>
  );
}

export default memo(MainScreen);
