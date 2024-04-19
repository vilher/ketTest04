import React, {memo, useCallback, useState} from 'react';
import {View, Text, Dimensions, Image} from 'react-native';
import {
  Surface,
  PaperProvider,
  Card,
  DefaultTheme,
  Button,
  ProgressBar,
} from 'react-native-paper';

import {useTheme} from 'react-native-paper';
import {connect, shallowEqual, useDispatch, useSelector} from 'react-redux';
import {mapDispatchToProps} from '../../model/redux/store';
import {welcomeTitle} from '../../model/redux/state/titleText';
import {Categories} from '../../model/redux/state/Categories';
import getIcons from '../../model/images/getIcons';
import {useFocusEffect} from '@react-navigation/native';

import {realmDb} from '../../model/realm/initRealm';
import {TablesName} from '../../model/realm/question';

const {height, width} = Dimensions.get('screen');

const DisplayCard = memo(({children}) => {
  const theme = useSelector(state => state.colors.card);
  return (
    <Card
      style={{
        backgroundColor: theme,
      }}>
      {children}
    </Card>
  );
});

const DisplayImage = memo(() => {
  const category = useSelector(state => state.system.category);
  return (
    <Image
      source={getIcons(`${category}_category`)}
      style={{
        width: width / 9,
        height: width / 9,
        alignSelf: 'center',
        marginLeft: 10,
        margin: 1,
      }}
    />
  );
});

const DisplayProgress = memo(() => {
  const {category, testsLength, correctLength} = useSelector(
    state => {
      return {
        category: state.system.category,
        testsLength: state.questions.tests.length,
        correctLength: state.user.correct.length,
      };
    },
    {
      equalityFn: (a, b) => {
        return a.category == b.category;
      },
    },
  );

  return (
    <ProgressBar
      style={{
        height: 15,
        borderRadius: 5,
        backgroundColor: `rgba(${
          Categories.find(({key}) => key == category)?.color
        },0.2)`,
      }}
      progress={testsLength && correctLength ? testsLength / correctLength : 0}
      color={`rgba(${
        Categories.find(({key}) => key == category)?.color
      },1)`}></ProgressBar>
  );
});

const DisplayTitle = memo(({fontSize}) => {
  const theme = useSelector(state => state.colors.text);
  const {testsLength, correctLength} = useSelector(state => {
    return {
      category: state.system.category,
      testsLength: state.questions.tests.length,
      correctLength: state.user.correct.length,
    };
  }, shallowEqual);
  return (
    <Text
      style={{
        fontWeight: 'bold',
        fontSize: 15,
        color: theme,
        textAlign: 'center',
      }}>
      {`${testsLength} / ${correctLength}`}
    </Text>
  );
});

const DisplayWelcome = memo(() => {
  const text = useSelector(state => state.colors.text);
  const language = useSelector(state => state.user.language);

  return (
    <Text
      style={{
        fontWeight: 'bold',
        fontSize: 20,
        color: text,
        textAlign: 'center',
      }}>
      {welcomeTitle[language]}
    </Text>
  );
});
function MainHeader() {
  return (
    <DisplayCard>
      <Card.Content>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            paddingBottom: 5,
          }}>
          <DisplayTitle></DisplayTitle>
          <View
            style={{
              flex: 1,
            }}>
            <View>
              <DisplayWelcome></DisplayWelcome>
            </View>

            <Text
              style={{
                paddingTop: 20,
                paddingLeft: 5,
              }}></Text>
          </View>
          <View
            style={{
              marginVertical: 6,
            }}>
            <DisplayImage></DisplayImage>
          </View>
        </View>
        <DisplayProgress></DisplayProgress>
      </Card.Content>
    </DisplayCard>
  );
}

export default memo(MainHeader);
