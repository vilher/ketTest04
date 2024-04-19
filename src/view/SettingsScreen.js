import React, {memo} from 'react';
import {View, Text, Dimensions, Image, TouchableOpacity} from 'react-native';
import {Card, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';
import {FlatList} from 'react-native-gesture-handler';
import getIcons from '../model/images/getIcons';

import {textTest} from '../model/redux/state/titleText';
import {textAppearance} from '../model/redux/state/Appearance';
import {textLanguage} from '../model/redux/state/Language';
import {textCategory} from '../model/redux/state/Categories';
import FastImage from 'react-native-fast-image';

import {enableFreeze} from 'react-native-screens';

const {height, width} = Dimensions.get('screen');

function SettingsScreen({navigation}) {
  const themes = useTheme();
  const {user, category, appearance} = useSelector(
    state => {
      return {
        user: state.user.language,
        category: state.system.category,
        appearance: state.system.appearance,
      };
    },
    {
      equalityFn: (a, b) => {
        return (
          a.category == b.category &&
          a.appearance == b.appearance &&
          a.user == b.user
        );
      },
    },
  );
  enableFreeze(true);

  const settingData = [
    {
      image: appearance,
      navigate: 'Appearance',
      titles: textAppearance,
    },
    {
      image: user,
      navigate: 'Language',
      titles: textLanguage,
    },
    {
      image: `${category}_category`,
      navigate: 'Category',
      titles: textCategory,
    },
  ];
  return (
    <View
      style={{
        flex: 1,
        marginHorizontal: 15,
      }}>
      <Text
        style={{
          paddingBottom: 10,
          paddingTop: 20,
          color: themes.colors.text,
        }}>
        {textTest.title[user]}
      </Text>
      <Card style={{backgroundColor: themes.colors.card}}>
        <FlatList
          data={settingData}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.push('MainStack', {screen: item.navigate});
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    padding: 8,
                    alignItems: 'center',
                    gap: 8,
                    borderBottomWidth: index + 1 < settingData.length ? 1 : 0,
                    borderColor: 'rgba(204,209,217,0.4)',
                  }}>
                  <FastImage
                    source={getIcons(item.image)}
                    style={{
                      width: 35,
                      height: 35,
                      marginLeft: 10,
                    }}
                  />
                  <Text
                    style={{
                      color: themes.colors.text,
                      alignItems: 'center',
                    }}>
                    {item.titles[user]}
                  </Text>
                  <View
                    style={{
                      justifyContent: 'center',
                      flex: 1,
                      alignItems: 'flex-end',
                    }}>
                    <Icon
                      name="chevron-right"
                      size={25}
                      color={themes.colors.text}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </Card>
    </View>
  );
}

export default memo(SettingsScreen);
