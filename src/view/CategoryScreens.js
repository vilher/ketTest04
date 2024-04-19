import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import {View, Text, Dimensions, TouchableOpacity, Image} from 'react-native';
import {useTheme, Switch, Card} from 'react-native-paper';
import {connect} from 'react-redux';
import {mapDispatchToProps} from '../model/redux/store';
import {Categories} from '../model/redux/state/Categories';
import {FlatList} from 'react-native-gesture-handler';
import getIcons from '../model/images/getIcons';
import FastImage from 'react-native-fast-image';

const {height, width} = Dimensions.get('screen');
const textCategory = {
  EN: 'Category',
  DE: 'Kategorie',
  PL: 'Kategoria',
};
const Cardo = memo(
  ({
    index,
    keys,
    icon,
    selected,
    dispatching,
    l,
    titles,
    ct,
    secondaryRgba,
  }) => {
    const images = useMemo(() => getIcons(icon));
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
            source={images}
            resizeMode={FastImage.resizeMode.contain}
          />
          <Text
            style={{
              marginLeft: 15,
              color: ct,
              alignSelf: 'center',
            }}>
            {titles}
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            transform: [{scaleX: 1.2}, {scaleY: 1.2}],
          }}>
          <Switch
            color={`rgba(${secondaryRgba})`}
            value={selected}
            onValueChange={() => {
              dispatching(keys);
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
    return next.selected == prev.selected;
  },
);

function CategoryScreens({set_category, category, language, navigation}) {
  const theme = useTheme();

  const dispatching = useCallback(set_category, []);

  useEffect(() => {
    navigation.setOptions({
      title: textCategory[language],
    });
  }, [navigation]);

  return (
    <View style={{flex: 1, marginHorizontal: 15}}>
      <Card
        style={{
          backgroundColor: theme.colors.card,
        }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={Categories}
          renderItem={({item, index}) => {
            return (
              <Cardo
                key={index}
                keys={item.key}
                icon={item.icon}
                titles={item.titles[language]}
                dispatching={dispatching}
                index={index}
                selected={category == item.key}
                l={Categories.length}
                ct={theme.colors.text}
                secondaryRgba={theme.colors.secondaryRgba}
              />
            );
          }}
        />
      </Card>
    </View>
  );
}

const storeState = (state, state2) => {
  return {
    category: state.system.category,
    language: state.user.language,
    navigation: state2.navigation,
  };
};

export default connect(storeState, mapDispatchToProps)(memo(CategoryScreens));
