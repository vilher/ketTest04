import React, {memo, useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Button,
  Animated,
  KeyboardAvoidingView,
} from 'react-native';
import store, {
  mapDispatchToProps,
} from '../../firebase/reducer/initialState/store';
import {connect} from 'react-redux';
import {Colors} from '../../Colors';
import {app} from '../../firebase/initFirebase';
import auth, {GoogleAuthProvider, getAuth} from 'firebase/auth';

const {width, height} = Dimensions.get('screen');

import {navigate} from '../rootNavigation';
import {getUser, logedIn, saveUserInfo} from '../../sqlite/InitTables/user';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import Svg, {G, Circle} from 'react-native-svg';
import IconsName from '../../images/IconsName';
import getIcons from '../../images/getIcon';
import {Donut} from 'react-native-donut-chart';
import Icon from 'react-native-vector-icons/Feather';
import {Card} from 'react-native-paper';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {realmDb} from '../../sqlite/initSqlite';
import {TablesName} from '../../sqlite/InitTables/testQuestions';
import GoogleLogin from '../components/googleLogin';

function LoginScreen({set_user}) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const scrollX = useRef(new Animated.Value(0)).current;

  const [login, setLogin] = useState(true);
  const [error, setError] = useState(false);
  const [errorMess, setErrorMess] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPass, setRepeatPass] = useState('');

  const [current, setCurrent] = useState(0);
  const flatListRef = useRef(null);

  async function onFacebookButtonPress() {
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );
    return auth().signInWithCredential(facebookCredential);
  }
  const dashboard = [
    {
      title: 'Interactive Learning Tools & Simulations',
      fact: `This driving test app combines interactive learning tools, \nincluding visual aids, simulated driving scenarios, and videos, allowing users to switch languages for all tests.`,
      icon: IconsName.driving_pass,
    },
    {
      title: 'Extensive Vehicle Categories for Varied Driving Needs',
      fact: 'Includes a wide spectrum of categories \nsuch as A, A1, A2, AM, B, C, C1, D, and D1, \ncatering to different vehicle types and driving conditions.',
      icon: IconsName.sport_car,
    },
    {
      title: 'Personalized Progress: Adaptive Learning Algorithms',
      fact: 'Adaptive learning algorithms meticulously assess \nuser performance, dynamically tailoring question \ndifficulty based on individual progress.',
      icon: IconsName.driver_license,
    },
  ];

  useEffect(() => {
    if (flatListRef?.current) {
      flatListRef.current.scrollToIndex({index: current, animated: true});
    }
  }, [current]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        padding: 8,
        paddingBottom: 30,
      }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View
          style={{
            height: '100%',
            justifyContent: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 100,
            }}>
            <TouchableOpacity
              disabled={Boolean(current == 0)}
              style={{
                opacity: Boolean(current == 0) ? 0 : 1,
              }}
              onPress={() => {
                if (current) {
                  setCurrent(current - 1);
                }
              }}>
              <Text
                style={{
                  color: `rgba(${Colors.blueColorRgb},1)`,
                }}>
                Back
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={dashboard.length - 1 <= current}
              style={{
                opacity: dashboard.length - 1 <= current ? 0 : 1,
              }}
              onPress={() => {
                setCurrent(current + 1);
              }}>
              <Text
                style={{
                  color: `black`,
                }}>
                Next
              </Text>
            </TouchableOpacity>
          </View>

          <View>
            {/* <DisplayBoarding></DisplayBoarding> */}
            <FlatList
              ref={flatListRef}
              horizontal
              initialScrollIndex={current}
              scrollEnabled={false}
              showsHorizontalScrollIndicator={false}
              data={dashboard}
              contentContainerStyle={{
                paddingTop: 20,
              }}
              renderItem={({item, index}) => {
                return (
                  <View>
                    <View
                      style={{
                        position: 'absolute',
                        left: width * 0.194,
                        top: height * -0.024,
                      }}>
                      <Donut
                        data={[
                          {
                            value: index,
                            color: `rgba(${Colors.blueColorRgb},1)`,
                          },
                          {
                            value: dashboard.length - (index + 1),
                            color: `rgba(${Colors.blueColorRgb},0.1)`,
                          },
                        ]}
                        strokeWidth={5}
                        radius={120}
                      />
                    </View>
                    <Animated.View
                      style={{
                        width: width,
                        height: height / 3,
                      }}>
                      <Image
                        style={{
                          width: width / 2,
                          height: width / 2,
                          alignSelf: 'center',
                          marginBottom: 20,
                        }}
                        source={getIcons(item.icon)}
                      />
                    </Animated.View>
                  </View>
                );
              }}
            />

            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: 25,
              }}>
              {dashboard[current].title}
            </Text>
            <Text
              style={{
                color: 'black',
                marginBottom: 50,
              }}>
              {dashboard[current].fact}
            </Text>

            <View>
              <View
                style={{
                  justifyContent: 'center',
                  gap: 10,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    onFacebookButtonPress()
                      .then(d => {
                        // saveUserInfo('',d.additionalUserInfo.profile.name,d.additionalUserInfo.profile.email)
                        // set_user({name:d.additionalUserInfo.profile.name,email:d.additionalUserInfo.profile.email})
                        // navigate("License")
                      })
                      .catch(err => {
                        console.log(err);
                      });
                  }}>
                  <Card
                    mode="contained"
                    style={{
                      backgroundColor: `rgba(${Colors.blueWhiteColorRgb},0.1)`,
                      borderRadius: 5,
                      borderWidth: 1,
                      borderColor: `rgba(${Colors.blueColorRgb},1)`,
                      paddingLeft: 5,
                      paddingVertical: 6,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        columnGap: 14,
                      }}>
                      <Image
                        source={require('../../images/photos/facebook.png')}
                        style={{
                          width: 40,
                          height: 40,
                        }}
                      />
                      <Text
                        style={{
                          color: 'black',
                          alignSelf: 'center',
                          fontWeight: '500',
                        }}>
                        Login with Facebook
                      </Text>
                    </View>
                  </Card>
                </TouchableOpacity>

                <GoogleLogin></GoogleLogin>
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigate('LoginPassword');
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: 'black',
                paddingTop: 20,
              }}>
              Login with password
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
const storeState = (state, state2) => {
  return {};
};

export default connect(storeState, mapDispatchToProps)(memo(LoginScreen));
