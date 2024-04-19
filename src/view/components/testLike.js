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
import Icon from 'react-native-vector-icons/AntDesign';
import {mapDispatchToProps} from '../../model/redux/store';
import {set_like} from '../../model/redux/actions/userAction';
const {width, height} = Dimensions.get('screen');

function TestLike({questions}) {
  console.log('TestLike');
  const dispatch = useDispatch();
  const {liked, test} = useSelector(
    state => {
      return {
        test: questions[state.test.current],
        liked: state.user.likes[questions[state.test.current].id],
        current: state.test.current,
      };
    },
    (a, b) => a.liked == b.liked && a.current == b.current,
  );

  return (
    <TouchableOpacity
      onPress={() => {
        dispatch(set_like(test));
      }}>
      <View
        style={{
          height: height * 0.07,
          width: width * 0.2,
          backgroundColor: 'rgba(135,206,250,0.2)',
          justifyContent: 'center',
          borderRadius: 5,
          alignItems: 'center',
        }}>
        <Icon
          name={liked == undefined ? 'hearto' : 'heart'}
          size={30}
          type="material-icons"
          color="rgba(9,139,220,1)"
        />
      </View>
    </TouchableOpacity>
  );
}

export default memo(TestLike);
