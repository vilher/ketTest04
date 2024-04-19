import React, {memo, useMemo, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  SectionList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  Surface,
  PaperProvider,
  Card,
  DefaultTheme,
  Button,
} from 'react-native-paper';
import {useTheme} from 'react-native-paper';
import {connect, shallowEqual, useSelector} from 'react-redux';
import {mapDispatchToProps} from '../../model/redux/store';
import {
  categoriesTitle,
  categoriesTitlte2,
} from '../../model/redux/state/titleText';
import {Theme} from '../../model/redux/state/Theme';
import getIcons from '../../model/images/getIcons';
import {navigate} from '../../model/navigation/rootNavigation';

const {height, width} = Dimensions.get('screen');
const Cardes = memo(
  ({theme, anweredLength, questionLength, icon, texty}) => {
    const dIcon = useMemo(() => {
      return getIcons(icon);
    }, []);

    return (
      <TouchableOpacity
        style={{
          paddingHorizontal: 10,
          justifyContent: 'space-between',
          height: '100%',
        }}
        onPress={() => {
          navigate('Test', {key: icon});
        }}>
        <View>
          <Image
            source={dIcon}
            style={{
              width: width / 9,
              height: width / 9,
              alignSelf: 'flex-start',
              marginTop: 10,
              marginBottom: 10,
              margin: 1,
            }}
          />

          <View>
            <Text
              style={{
                color: theme.colors.text,
              }}>
              {texty}
            </Text>
          </View>
        </View>
        <View
          style={{
            alignItems: 'flex-end',
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              color: theme.colors.text,
              position: 'absolute',
              right: (anweredLength * 100) / questionLength > 10 ? 10 : 15,
              bottom: 15,
            }}>
            {`${
              anweredLength || questionLength
                ? Math.floor((anweredLength * 100) / questionLength)
                : 0
            }%`}
          </Text>
        </View>
      </TouchableOpacity>
    );
  },
  (prev, next) => {
    prev.theme.colors.text == next.theme.colors.text;
  },
);

function RulesMain() {
  const theme = useTheme();
  const language = useSelector(state => state.user.language);
  const results = useSelector(
    state => calcResults(state.user.tests, state.test.userAnswers),
    (a, b) => a.length == b.length,
  );

  return (
    <>
      <View>
        <Text
          style={{
            color: theme.colors.text,
            fontWeight: '700',
            fontSize: 14,
            marginTop: 20,
            marginLeft: 2,
            marginBottom: 5,
          }}>
          {categoriesTitlte2[language]}
        </Text>

        <SectionList
          contentContainerStyle={{
            paddingVertical: 2,
          }}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          sections={Theme.slice(0, Theme.length / 2).map(data2 => {
            return {data: [data2]};
          })}
          keyExtractor={(item, index) => index}
          renderItem={({item}) => {
            return (
              <Card
                disabled
                style={{
                  backgroundColor: theme.colors.card,
                  width: width / 2.5,
                  height: width / 1.7,
                  marginRight: 10,
                  marginLeft: 2,
                }}>
                <Cardes
                  theme={theme}
                  anweredLength={results[item.key]?.results}
                  questionLength={results[item.key]?.size}
                  icon={item.key}
                  texty={item[language]}></Cardes>
              </Card>
            );
          }}
        />
      </View>
      <View>
        <Text
          style={{
            color: theme.colors.text,
            fontWeight: '700',
            fontSize: 14,
            marginTop: 20,
            marginLeft: 2,
            marginBottom: 5,
          }}>
          {categoriesTitle[language]}
        </Text>

        <SectionList
          contentContainerStyle={{
            paddingVertical: 2,
            marginBottom: 20,
          }}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          sections={Theme.slice(Theme.length / 2, Theme.length).map(data2 => {
            return {data: [data2]};
          })}
          keyExtractor={(item, index) => index}
          renderItem={({item}) => {
            return (
              <Card
                disabled
                style={{
                  backgroundColor: theme.colors.card,
                  width: width / 2.5,
                  height: width / 1.3,
                  marginRight: 10,
                  marginLeft: 2,
                }}>
                <Cardes
                  theme={theme}
                  anweredLength={results[item.key]?.results}
                  questionLength={results[item.key]?.size}
                  icon={item.key}
                  texty={item[language]}></Cardes>
              </Card>
            );
          }}
        />
      </View>
    </>
  );
}

export default memo(RulesMain);

function calcResults(specificTest, userAnswers) {
  // return specificTest.reduce((prev, curr) => {
  //   let test = userAnswers[curr.id];
  //   let res = 0;

  //   if (test && test[test.length - 1]) {
  //     res = 1;
  //   }

  //   if (prev[curr.theme]) {
  //     prev[curr.theme] = {
  //       size: prev[curr.theme].size + 1,
  //       results: prev[curr.theme].results,
  //     };
  //   } else {
  //     prev[curr.theme] = {
  //       size: 1,
  //       results: 0,
  //     };
  //   }
  //   prev[curr.theme].results = prev[curr.theme].results + res;

  //   return prev;
  // }, {});
  return {};
}
