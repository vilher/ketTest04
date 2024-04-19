import React, {memo, useEffect, useMemo, useRef, useState} from 'react';
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
import DisplayHeader from './displayHeader';

const {width, height} = Dimensions.get('screen');

function NavHeader({questions}) {
  const flatListRef = useRef(null);
  const {current, testAnswers} = useSelector(
    state => {
      return {
        current: state.test.current,
        testAnswers: state.test.testAnswers,
      };
    },
    {
      equalityFn: (a, b) => {
        return (
          a.current == b.current && a.testAnswers.length == b.testAnswers.length
        );
      },
    },
  );
  return (
    <View
      style={{
        marginVertical: 10,
      }}>
      <FlatList
        ref={flatListRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        initialNumToRender={10}
        maxToRenderPerBatch={5}
        windowSize={10}
        getItemLayout={(data, index) => ({
          length: 34,
          offset: 34 * index,
          index,
        })}
        data={questions}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
        renderItem={({item, index}) => {
          return (
            <DisplayHeader
              index={index}
              same={current === index}
              answered={testAnswers[index]}
              showCorrect={true}
            />
          );
        }}
      />
    </View>
  );
}

export default memo(NavHeader);
