import React, {memo, useEffect, useMemo, useRef, useState} from 'react';
import {View, Text, Dimensions, Image} from 'react-native';
import {
  Surface,
  PaperProvider,
  Card,
  DefaultTheme,
  Button,
  FAB,
} from 'react-native-paper';
import Video from 'react-native-video';
import {useTheme} from 'react-native-paper';
import {connect, useSelector} from 'react-redux';
import RNFS from 'react-native-fs';
import {FlatList} from 'react-native-gesture-handler';
import {getStorage, ref, getDownloadURL} from 'firebase/storage';
import {mapDispatchToProps} from '../../model/redux/store';
import {app} from '../../model/firebase/initFirebase';
import FastImage from 'react-native-fast-image';

function showUrl(media) {
  return media.split('.').pop().toLowerCase() == 'jpg' ? 'file://' : '';
}

const storage = getStorage(app);
const {height, width} = Dimensions.get('screen');

const DisplayMedia = ({media}) => {
  console.log('display media ');
  const [displayVideo, setDisplayVideo] = useState(null);
  const theme = useTheme();
  useEffect(() => {
    if (media) {
      if (
        media.split('.').pop().toLowerCase() == 'mp4' ||
        media.split('.').pop().toLowerCase() == 'jpg'
      ) {
        RNFS.readFile(RNFS.DocumentDirectoryPath + '/' + media, 'base64')
          .then(fileContent => {
            setDisplayVideo(
              showUrl(media) + `${RNFS.DocumentDirectoryPath + '/' + media}`,
            );
          })
          .catch(async err => {
            const storageRef = ref(storage, `media/${media}`);
            const url = await getDownloadURL(storageRef);

            const file = {
              fromUrl: url,
              toFile: RNFS.DocumentDirectoryPath + '/' + media,
            };
            await RNFS.downloadFile(file);
            setDisplayVideo(url);
          });
      }
    }
  }, []);

  return (
    <View
      style={{
        alignItems: 'center',
        width,
      }}>
      {displayVideo ? (
        media.split('.').pop().toLowerCase() == 'mp4' ? (
          <Video
            source={{
              uri: displayVideo,
            }}
            style={{
              height: height * 0.2,
              width: '100%',
            }}
            repeat={true}
            bufferConfig={{
              minBufferMs: 15000,
              maxBufferMs: 50000,
              bufferForPlaybackMs: 2500,
              bufferForPlaybackAfterRebufferMs: 5000,
            }}
            rate={1.0}
            volume={1.0}
            resizeMode="cover"
          />
        ) : (
          <FastImage
            source={{uri: `${displayVideo}`}}
            style={{
              width: width,
              height: height * 0.2,
              resizeMode: 'cover',
            }}
          />
        )
      ) : media ? (
        <FAB
          loading
          mode="flat"
          color={theme.colors.text}
          style={{
            backgroundColor: 'rgba(0,0,0,0)',
            width: width,
            height: height * 0.2,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      ) : (
        <View style={width}></View>
      )}
    </View>
  );
};

export default memo(DisplayMedia);

// ["117D16aorg.jpg", "W11korytarzz005.jpg", "W11korytarzz001.jpg", "IMG3731d8orgbm.jpg", "JAZDANOCAorg.mp4", "piec5.mp4"]
// ["117D16_a_org.jpg", "W11 korytarz z 005.jpg", "W11 korytarz z 001.jpg", "IMG_3731d8orgbm.jpg", "JAZDA NOCĄorg.mp4", "pięć5.mp4"]
