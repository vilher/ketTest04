import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';
import {
  Surface,
  PaperProvider,
  Card,
  DefaultTheme,
  Button,
  Switch,
} from 'react-native-paper';
import {useTheme} from 'react-native-paper';
import {connect, useDispatch, useSelector} from 'react-redux';
import {mapDispatchToProps} from '../model/redux/store';
import {Languages} from '../model/redux/state/Language';
import getIcons from '../model/images/getIcons';
import FastImage from 'react-native-fast-image';
import {set_language} from '../model/redux/actions/userAction';
import {FlashList} from '@shopify/flash-list';

export const textLanguage = {
  EN: 'Language',
  DE: 'Sprache',
  PL: 'Język',
};

const {height, width} = Dimensions.get('screen');

const DisplayLanguage = memo(
  ({l, keys, finded, secondaryRgba, cText, setLanguage, index, same}) => {
    const image = useMemo(() => {
      switch (keys) {
        case 'EN':
          return require(`../model/images/photos/UK.png`);
        case 'PL':
          return require(`../model/images/photos/PL.png`);
        default:
          return require(`../model/images/photos/DE.png`);
      }
    }, []);
    const dispatch = useDispatch();

    return (
      <View
        key={index}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderBottomWidth: l > index + 1 ? 1 : 0,
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
            source={image}
            resizeMode={FastImage.resizeMode.contain}
          />
          <Text
            style={{
              marginLeft: 15,
              color: cText,
              alignSelf: 'center',
            }}>
            {finded}
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            transform: [{scaleX: 1.2}, {scaleY: 1.2}],
          }}>
          <Switch
            color={`rgba(${secondaryRgba})`}
            value={same}
            onValueChange={() => {
              dispatch(set_language(keys));
            }}
            style={{
              height: 50,
              width: 50,
            }}
          />
        </View>
      </View>
    );
  },
  (prev, next) => {
    return prev.same == next.same;
  },
);

function LanguageScreen({navigation}) {
  const theme = useTheme();
  const language = useSelector(state => state.user.language);
  const showLanguages = useMemo(() => {
    return Languages;
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: textLanguage[language],
    });
  }, [navigation, language]);

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: 'none',
      },
    });
    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: undefined,
      });
  }, [navigation]);

  return (
    <View
      style={{
        paddingVertical: 15,
        backgroundColor: theme.colors.background,
        width,
        height,
      }}>
      <Card
        style={{
          backgroundColor: theme.colors.card,
          marginHorizontal: 15,
          marginBottom: 25,
        }}>
        <FlatList
          data={Languages}
          renderItem={({item, index}) => {
            return (
              <DisplayLanguage
                l={Object.keys(showLanguages).length}
                keys={item.key}
                finded={
                  showLanguages.find(({key}) => key == language)[item.key]
                }
                secondaryRgba={theme.colors.secondaryRgba}
                cText={theme.colors.text}
                index={index}
                same={language == item.key}
              />
            );
          }}
          estimatedItemSize={200}
        />
      </Card>
    </View>
  );
}

export default memo(LanguageScreen);
