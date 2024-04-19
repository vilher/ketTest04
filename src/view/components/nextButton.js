import React, {memo, useEffect, useMemo, useRef, useState} from 'react';
import {
  Text,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {connect, useDispatch, useSelector} from 'react-redux';
import {navigate} from '../../model/navigation/rootNavigation';
import {mapDispatchToProps} from '../../model/redux/store';
import {buttonAnswer, buttonNext} from '../../model/redux/state/titleText';
import {set_answer, set_current} from '../../model/redux/actions/testAction';
import {useRoute} from '@react-navigation/native';

const {width, height} = Dimensions.get('screen');

function NextButton({questions}) {
  const route = useRoute();
  const dispatch = useDispatch();
  const {current, themes, language, testAnswers, goNext, test} = useSelector(
    state => {
      return {
        testAnswers: state.test.testAnswers[state.test.current],
        current: state.test.current,
        language: state.user.language,
        test: questions[state.test.current],
        goNext: questions.length - 1 == state.test.current,
      };
    },
    (a, b) => a.current == b.current && a.testAnswers == b.testAnswers,
  );
  console.log('nextButton');
  return (
    <View>
      <TouchableOpacity
        style={{
          opacity:
            !route.params.displayResult &&
            goNext &&
            typeof testAnswers == 'boolean'
              ? 0
              : 1,
          pointerEvents:
            !route.params.displayResult &&
            goNext &&
            typeof testAnswers == 'boolean'
              ? 'none'
              : 'auto',
        }}
        onPress={() => {
          if (typeof testAnswers == 'boolean') {
            if (questions.length - 1 == current) {
              navigate('Result');
            } else {
              dispatch(set_current(current + 1));
            }
          } else {
            dispatch(set_answer(test));
          }
        }}>
        <View
          style={{
            height: height * 0.07,
            width: width * 0.7,
            backgroundColor: 'rgba(135,206,250,0.2)',
            justifyContent: 'center',
            borderRadius: 5,
          }}>
          <Text
            style={{
              color: 'rgba(9,139,220,1)',
              textAlign: 'center',
              fontWeight: 'bold',
            }}>
            {typeof testAnswers == 'boolean'
              ? buttonNext[language]
              : buttonAnswer[language]}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default memo(NextButton);
