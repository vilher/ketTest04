import React, {memo, useEffect, useMemo, useRef, useState} from 'react';
import {View, Text, Dimensions, Image, FlatList} from 'react-native';
import {
  Surface,
  PaperProvider,
  Card,
  DefaultTheme,
  Button,
} from 'react-native-paper';
import Video from 'react-native-video';
import {useTheme} from 'react-native-paper';
import {connect, useSelector} from 'react-redux';
import {mapDispatchToProps} from '../model/redux/store';
import RNFS from 'react-native-fs';
import {getStorage, ref, getDownloadURL} from 'firebase/storage';
import {app} from '../model/firebase/initFirebase';
import DisplayMedia from './components/displayMedia';
import TestAnswers from './components/testAnswers';
import TestQuestion from './components/testQuestion';
import NextButton from './components/nextButton';
import TestLike from './components/testLike';
import {realmDb} from '../model/realm/initRealm';
import {UserTable} from '../model/realm/user';
import NavHeader from './components/navHeader';

const {height, width} = Dimensions.get('screen');

function TestScreen({navigation}) {
  console.log('testScreen');

  const {questions, current, language, testAnswers, userSelects} = useSelector(
    state => {
      return {
        questions: state.questions.tests.slice(0, 20),
        current: state.test.current,
        language: state.user.language,
        testAnswers: state.test.testAnswers,
        userSelects: state.test.userSelects,
        rerender: state.test.testAnswers[state.test.current],
        rerender2: state.test.userSelects[state.test.current],
      };
    },
    {
      equalityFn: (a, b) => {
        return (
          a.current == b.current &&
          a.rerender == b.rerender &&
          a.rerender2 == b.rerender2
        );
      },
    },
  );

  const flatListRef = useRef(null);

  useEffect(() => {
    navigation.setOptions({
      title: `${current} from ${questions.length}`,
    });
    if (questions.length && Boolean(flatListRef?.current)) {
      flatListRef.current.scrollToIndex({index: current, animated: true});
    }
  }, [current]);
  // useEffect(() => {
  //   generate_test({action, user});
  // }, []);
  return (
    <View>
      <NavHeader questions={questions}></NavHeader>
      <FlatList
        ref={flatListRef}
        horizontal
        initialNumToRender={2}
        maxToRenderPerBatch={2}
        windowSize={10}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        data={questions}
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        renderItem={({item, index}) => {
          console.log(index == current);
          return (
            <View style={{width}}>
              <DisplayMedia
                key={index}
                media={item.media}
                index={index}></DisplayMedia>
              <TestQuestion
                text={item.question[language.toLowerCase()]}></TestQuestion>
              <TestAnswers
                answers={item.answers}
                answered={testAnswers[index]}
                userSelects={userSelects[index]}></TestAnswers>
            </View>
          );
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          marginVertical: 20,
          justifyContent: 'space-between',
          paddingHorizontal: 8,
        }}>
        <NextButton questions={questions}></NextButton>
        {/* <TestLike questions={questions}></TestLike> */}
      </View>
    </View>
  );
}

export default TestScreen;
