import React, {memo, useState} from 'react';
import {View, Text, Dimensions} from 'react-native';
import {
  Surface,
  PaperProvider,
  Card,
  DefaultTheme,
  Button,
} from 'react-native-paper';
import {useTheme} from 'react-native-paper';
import {connect} from 'react-redux';
import {mapDispatchToProps} from '../model/redux/store';

const {height, width} = Dimensions.get('screen');

function TemplateScreen() {
  const theme = useTheme();

  return <View style={{flex: 1}}></View>;
}

const storeState = (state, state2) => {
  return {};
};

export default connect(storeState, mapDispatchToProps)(memo(TemplateScreen));
