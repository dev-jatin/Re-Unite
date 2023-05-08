import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  PermissionsAndroid,
  Pressable,
} from 'react-native';
import {SvgCss} from 'react-native-svg';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import {useSetRecoilState} from 'recoil';
import {imagePickerState, imageState} from '../../recoil';
import {Svg} from '../../../assets';

export const ImagePicker = () => {
  const setImagePicker = useSetRecoilState(imagePickerState);
  const setImage = useSetRecoilState(imageState);

  let options = {
    saveToPhotos: true,
    mediaType: 'photo',
  };

  const pickImage = async type => {
    const granted =
      type === 'Camera'
        ? await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          )
        : PermissionsAndroid.RESULTS.GRANTED;

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const result =
        type === 'Camera'
          ? await launchCamera(options)
          : await launchImageLibrary(options);

      if (!result.didCancel) {
        result.assets[0].name = result.assets[0].fileName;
        setImage(result.assets[0]);
        hideImagePicker();
      }
    }
  };

  const hideImagePicker = () => {
    setImagePicker(false);
  };

  return (
    <View style={styles.container_1}>
      <View style={styles.shadow} />
      <View style={styles.container_2}>
        <View style={styles.container_3}>
          <Text style={styles.text_1}>Select image from</Text>
          <Pressable onPress={hideImagePicker}>
            <SvgCss xml={Svg.CROSS_ICON} />
          </Pressable>
        </View>

        <View style={styles.container_4}>
          <Pressable onPress={() => pickImage('Camera')}>
            <SvgCss xml={Svg.CAMERA_ICON} />
            <Text style={styles.text}>Camera</Text>
          </Pressable>

          <Pressable onPress={() => pickImage('Gallery')}>
            <SvgCss xml={Svg.GALLERY_ICON} />
            <Text style={styles.text}>Gallery</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container_1: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  container_2: {
    padding: '8%',
    marginTop: 'auto',
    backgroundColor: 'white',
  },
  container_3: {
    marginBottom: '8%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container_4: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  text_1: {
    textAlign: 'center',
  },
  text: {
    textAlign: 'center',
  },
  shadow: {
    backgroundColor: 'black',
    opacity: 0.7,
    flex: 1,
  },
});
