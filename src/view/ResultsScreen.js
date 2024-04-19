import React, {memo, useState} from 'react';
import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
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
import FastImage from 'react-native-fast-image';
import getIcons from '../model/images/getIcons';
import IconsName from '../model/images/IconsName';
import {MultiArcCircle} from 'react-native-circles';
import {DonutChart} from 'react-native-circular-chart';

const {height, width} = Dimensions.get('screen');

function ResultScreen({navigation}) {
  const theme = useTheme();
  const data = [{value: 50, name: 'Cd', color: 'red'}];

  return (
    <View
      style={{
        flex: 1,
        marginTop: 20,
        marginHorizontal: 10,
      }}>
      <Card
        style={{
          backgroundColor: theme.colors.card,
          alignItems: 'center',
          paddingBottom: 10,
        }}>
        <Text
          style={{
            color: theme.colors.text,
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 25,
            paddingTop: 8,
          }}>
          Ups!
        </Text>
        <Text
          style={{
            color: theme.colors.text,
            textAlign: 'center',
            paddingBottom: 10,
          }}>
          You did not pass
        </Text>
        <FastImage
          style={{
            width: height * 0.13,
            height: height * 0.13,
            alignSelf: 'center',
          }}
          source={getIcons(IconsName.police_cap_fail)}
        />

        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <View
            style={{
              height: height * 0.06,
              width: width - 50,
              backgroundColor: 'rgba(9,139,220,1)',
              justifyContent: 'center',
              borderRadius: 5,
              marginHorizontal: 10,
              marginTop: 10,
            }}>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              View Solutions
            </Text>
          </View>
        </TouchableOpacity>
      </Card>

      <>
        <Text
          style={{
            color: theme.colors.text,
            fontWeight: 'bold',
            fontSize: 15,
            paddingTop: 25,
            paddingBottom: 5,
          }}>
          Summary
        </Text>
        <Card
          style={{
            backgroundColor: theme.colors.card,
            alignItems: 'center',
          }}>
          <Card.Content>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
              }}>
              <Circle
                height={width / 4}
                text={'6'}
                color={'#38E54D'}
                textColor={theme.colors.text}
                circleWidth={4}
                fill={25}
                title={'Points'}></Circle>
              <Circle
                height={width / 4}
                text={'6'}
                color={'#FFED00'}
                textColor={theme.colors.text}
                circleWidth={4}
                fill={25}
                title={'Time'}></Circle>
              <Circle
                height={width / 4}
                text={'6'}
                color={'#387ADF'}
                textColor={theme.colors.text}
                circleWidth={4}
                fill={25}
                title={'Saved'}></Circle>
            </View>
          </Card.Content>
        </Card>
      </>

      <>
        <Text
          style={{
            color: theme.colors.text,
            fontWeight: 'bold',
            fontSize: 15,
            paddingTop: 25,
            paddingBottom: 5,
          }}>
          Questions
        </Text>
        <Card
          style={{
            backgroundColor: theme.colors.card,
            alignItems: 'center',
          }}>
          <Card.Content>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
              }}>
              <Circle2
                height={width / 4}
                text={'6'}
                color={'#38E54D'}
                textColor={theme.colors.text}
                circleWidth={4}
                fill={25}
                fill2={78}
                title={'Points'}></Circle2>
            </View>
          </Card.Content>
        </Card>
      </>
      <DonutChart
        data={data}
        strokeWidth={15}
        radius={90}
        containerWidth={width * 2}
        containerHeight={105 * 2}
        type="round"
        startAngle={0}
        endAngle={360}
        animationType="slide"
      />
    </View>
  );
}

export default memo(ResultScreen);

function Circle({height, textColor, text, color, circleWidth, fill, title}) {
  return (
    <View>
      <View
        style={{
          height: height,
          width: height,
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 15,
        }}>
        <Text
          style={{
            color: textColor,
            fontWeight: 'bold',
            fontSize: 18,
          }}>
          {text}
        </Text>
        <MultiArcCircle
          radius={height / 2.2}
          intervals={[{start: 0, end: (fill * 360) / 100}]}
          color={color}
          backgroundColor="#B4B4B8"
          width={circleWidth}></MultiArcCircle>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <View
          style={{
            height: 6,
            width: 6,
            backgroundColor: color,
            borderRadius: 100,
            alignSelf: 'center',
            marginRight: 5,
          }}></View>
        <Text
          style={{
            color: textColor,
            fontSize: 12,
          }}>
          {title}
        </Text>
      </View>
    </View>
  );
}
function Circle2({height, circleWidth, fill, fill2}) {
  return (
    <View>
      <MultiArcCircle
        radius={height / 2.2}
        intervals={[
          {start: 0, end: 20},
          {start: 40, end: 60},
        ]}
        color={'red'}
        backgroundColor="#B4B4B8"
        width={circleWidth}></MultiArcCircle>
    </View>
  );
}
