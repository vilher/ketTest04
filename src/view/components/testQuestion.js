import React, {memo, useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {connect, useSelector} from 'react-redux';
import {mapDispatchToProps} from '../../model/redux/store';
import {useTheme} from 'react-native-paper';
const {width, height} = Dimensions.get('screen');

function TestQuestion({text}) {
  console.log('testQuestions/');
  const theme = useTheme();

  return (
    <>
      <Text
        style={{
          fontSize: 17,
          marginHorizontal: 8,
          color: theme.colors.text,
          marginVertical: 15,
        }}>
        {text}
      </Text>
    </>
  );
}

export default memo(TestQuestion);
