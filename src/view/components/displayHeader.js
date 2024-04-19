import React, {memo, useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {connect, useDispatch} from 'react-redux';
import {mapDispatchToProps} from '../../model/redux/store';
import {set_current} from '../../model/redux/actions/testAction';
const {width, height} = Dimensions.get('screen');

function DisplayHeader({index, answered, same, showCorrect}) {
  console.log('diaplay header');
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      onPress={() => {
        showCorrect ? dispatch(set_current(index)) : null;
      }}>
      <View
        style={{
          height: same ? 34 : 30,
          width: same ? 34 : 30,
          backgroundColor: same
            ? typeof answered == 'boolean' && showCorrect
              ? answered
                ? 'rgba(34,139,34,0.6)'
                : 'rgba(232,75,94,1)'
              : 'rgba(135,206,250,1)'
            : typeof answered == 'boolean' && showCorrect
            ? answered
              ? 'rgba(34,139,34,0.2)'
              : 'rgba(232,75,94,0.6)'
            : 'rgba(135,206,250,0.2)',
          marginLeft: same ? 4 : 6,
          marginRight: same ? 4 : 6,
          borderRadius: 5,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1,
          borderColor: same
            ? typeof answered == 'boolean' && showCorrect
              ? answered
                ? 'rgba(34,139,34,1)'
                : 'rgba(232,75,94,1)'
              : 'rgba(9,139,220,1)'
            : typeof answered == 'boolean' && showCorrect
            ? answered
              ? 'rgba(34,139,34,1)'
              : 'rgba(232,75,94,1)'
            : 'rgba(9,139,220,1)',
          // marginVertical: 1,
        }}>
        <Text
          style={{
            color: same
              ? typeof answered == 'boolean' && showCorrect
                ? answered
                  ? 'rgba(216,228,188,1)'
                  : 'white'
                : 'rgba(235,247,254,1)'
              : typeof answered == 'boolean' && showCorrect
              ? 'white'
              : 'rgba(9,139,220,1)',
            fontWeight: '700',
          }}>
          {index + 1}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
const storeState = (state, state2) => {
  return {
    answered: state2.answered,
    index: state2.index,
    same: state2.same,
    showCorrect: state2.showCorrect,
  };
};

export default connect(storeState, mapDispatchToProps)(DisplayHeader);
