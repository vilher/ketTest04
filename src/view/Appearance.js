import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import {View, Text, Dimensions, ScrollView, Image} from 'react-native';
import {
  Surface,
  PaperProvider,
  Card,
  DefaultTheme,
  Button,
} from 'react-native-paper';
import {useTheme, Switch} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {mapDispatchToProps} from '../model/redux/store';
import getIcons from '../model/images/getIcons';
import {Appearances} from '../model/redux/state/Appearance';
import {FlatList} from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import {set_appearance} from '../model/redux/actions/systemSpecific';
import {set_dark, set_white} from '../model/redux/actions/colorAction';
const {height, width} = Dimensions.get('screen');

const textAppearance = {
  EN: 'Appearance',
  DE: 'Aussehen',
  PL: 'Wygląd',
};

function Appearance({navigation}) {
  const appearance = useSelector(state => state.system);

  const {user, theme} = useSelector(
    state => ({
      user: state.user.language,
      theme: state.colors,
    }),
    {
      equalityFn: (a, b) => {
        return a.theme.dark == b.theme.dark;
      },
    },
  );

  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setOptions({
      title: textAppearance[user],
      headerStyle: {
        backgroundColor: theme.background,
      },
      headerTitleStyle: {
        color: theme.text,
      },
    });
  }, [navigation, theme.background]);

  return (
    <View
      style={{
        paddingVertical: 15,
        backgroundColor: theme.background,
        flex: 1,
      }}>
      <Card
        style={{
          backgroundColor: theme.card,
          marginHorizontal: 15,
          marginBottom: 25,
        }}>
        <FlatList
          data={Appearances}
          renderItem={({item, index}) => {
            return (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderBottomWidth: Appearances.length > index + 1 ? 1 : 0,
                  borderColor: 'rgba(204,209,217,0.4)',
                  paddingRight: 25,
                }}>
                <View
                  style={{
                    padding: 10,
                    flexDirection: 'row',
                  }}>
                  <FastImage
                    style={{
                      width: 35,
                      height: 35,
                    }}
                    source={getIcons(item.icon)}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                  <Text
                    style={{
                      marginLeft: 15,
                      color: theme.text,
                      alignSelf: 'center',
                      fontWeight: '500',
                    }}>
                    {item.titles[user]}
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    transform: [{scaleX: 1.2}, {scaleY: 1.2}],
                  }}>
                  <Switch
                    color={`rgba(${theme.secondaryRgba})`}
                    onValueChange={() => {
                      // setDarkTheme(item.icon);
                      // dispatch({type: 'SET_WHITE'});

                      dispatch(set_appearance(item.icon));
                      item.icon == 'half-moon'
                        ? dispatch(set_dark())
                        : dispatch(set_white());
                      // item.icon == 'half-moon' ? set_dark() : set_white();
                    }}
                    // value={darkTheme == item.icon}
                    value={appearance.appearance == item.icon}
                    style={{
                      height: 50,
                      width: 50,
                    }}
                  />
                </View>
              </View>
            );
          }}
        />
      </Card>
    </View>
  );
}

// const storeState = (state, state2) => {
//   return {
//     appearance: state.system.appearance,
//     language: state.user.language,
//   };
// };

export default memo(Appearance);
