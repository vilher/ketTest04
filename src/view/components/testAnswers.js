import React, {memo, useEffect, useMemo, useRef, useState} from 'react';
import {
  Text,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {connect, shallowEqual, useDispatch, useSelector} from 'react-redux';
import {mapDispatchToProps} from '../../model/redux/store';
import {shuffleArrayObj} from '../../model/redux/actions/userAction';
import {set_user_select} from '../../model/redux/actions/testAction';
import {useTheme} from 'react-native-paper';

const {width, height} = Dimensions.get('screen');

function TestAnswers({answers, answered, userSelects, shuffle}) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const language = useSelector(state => state.user.language);

  const answ = useMemo(() => {
    return shuffleArrayObj(answers);
  }, []);
  return (
    <View style={{paddingHorizontal: 8}}>
      {answ.map((answer, index) => {
        return (
          <TouchableOpacity
            style={{
              width: '100%',
            }}
            disabled={typeof answered == 'boolean'}
            key={index}
            onPress={() => {
              dispatch(set_user_select(answer.id));
            }}>
            <View
              key={index}
              style={{
                paddingVertical: 15,
                paddingHorizontal: 10,
                borderWidth: 2,
                borderColor:
                  userSelects == answer.id
                    ? typeof answered == 'boolean'
                      ? answer.isCorrect
                        ? 'rgba(34,139,34,0.7)'
                        : 'rgba(232,75,94,0.7)'
                      : 'rgba(9,139,220,1)'
                    : 'rgba(174,174,174,0.3)',
                marginVertical: 5,
                borderRadius: 5,
                backgroundColor:
                  typeof answered == 'boolean'
                    ? answer.isCorrect
                      ? 'rgba(34,139,34,0.2)'
                      : 'rgba(232,75,94,0.2)'
                    : null,
              }}>
              <Text
                style={{
                  color: theme.colors.text,
                }}>
                {answer.answer[language.toLowerCase()]}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default memo(TestAnswers, (prev, curr) => {
  return prev.userSelects == curr.userSelects && prev.answered == curr.answered;
});
