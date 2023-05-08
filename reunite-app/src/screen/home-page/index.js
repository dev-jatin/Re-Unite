import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';

import {Color, Font, Routes, Svg, Translation} from '../../../assets';
import {SvgCss} from 'react-native-svg';

import {
  Camera,
  media,
  torchvision,
  torch,
  MobileModel,
} from 'react-native-pytorch-core';

const T = torchvision.transforms;

let model = null;

const HomePage = () => {
  const navigation = useNavigation();

  async function handleImage(image) {
    const width = image.getWidth();
    const height = image.getHeight();

    const blob = media.toBlob(image);

    let tensor = torch
      .fromBlob(blob, [height, width, 3])
      .permute([2, 0, 1])
      .unsqueeze(0)
      .to({dtype: torch.float32});

    if (model == null) {
      console.log('loading.....');
      const filePath = await MobileModel.download(
        require('../../../assets/model/ultra_face_detector.ptl'),
      );

      model = await torch.jit._loadForMobile(filePath);
      console.log('model is loaded.....');
    }

    const output = await model.forward(tensor);

    let boxes = output[1];
    let scores = output[0];

    boxes = boxes[0];
    scores = scores[0];

    let picked_box_probs = [];

    let prob_threshold = 0.6;

    const size = scores.size()[1];
    const innerSize = scores.size()[0];
    for (let i = 1; i < size; i++) {
      let mask = [];

      for (let j = 0; j < innerSize; j++) {
        let probs = scores.index(Slice(None, None, j));
        mask.push(scores[0][1].item() > prob_threshold);
      }

      console.log(mask.length);
    }
  }

  return (
    <View style={StyleSheet.absoluteFill}>
      <Camera
        style={StyleSheet.absoluteFill}
        // Add handle image callback on the camera component
        onCapture={handleImage}
      />
    </View>
  );

  return (
    <View>
      <Image source={{uri: 'https://picsum.photos/200/300'}} />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate(Routes.RAISE_COMPLAINT_PAGE)}>
        <View style={styles.icon_1}>
          <SvgCss height={20} width={20} xml={Svg.COMPLAINT_ICON} />
        </View>
        <View style={styles.container_1}>
          <Text style={styles.text}>
            {Translation.English.RAISE_A_COMPLAINT}
          </Text>
          <Text style={styles.text_1}>
            Raise a compliant / Fir for missing person / child
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate(Routes.SEARCH_PAGE)}>
        <View style={styles.icon_2}>
          <SvgCss height={20} width={20} xml={Svg.SEARCH_ICON} />
        </View>
        <View style={styles.container_1}>
          <Text style={styles.text}>
            {Translation.English.SEARCH_A_COMPLAINT}
          </Text>
          <Text style={styles.text_1}>
            Trace suspicious child detail from image
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate(Routes.MY_COMPLAINT_PAGE)}>
        <View style={styles.icon_3}>
          <SvgCss height={25} width={25} xml={Svg.MY_COMPLAINT_ICON} />
        </View>
        <View style={styles.container_1}>
          <Text style={styles.text}>My Complaints</Text>
          <Text style={styles.text_1}>Check status of all your complaints</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  text: {
    color: Color.BLACK,
    fontSize: 16,
    fontFamily: Font.POPPINS_SEMIBOLD,
  },
  text_1: {
    color: Color.GREY,
    fontSize: 12,
    fontFamily: Font.POPPINS_THIN,
  },
  icon_1: {
    height: 35,
    width: 35,
    marginRight: 20,
    backgroundColor: 'rgba(123, 18, 64, 0.29)',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',

    elevation: 1,
    borderRadius: 2,
  },
  icon_2: {
    height: 35,
    width: 35,
    marginRight: 20,
    backgroundColor: 'rgba(48, 4, 148, 0.29)',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',

    elevation: 1,
    borderRadius: 2,
  },
  icon_3: {
    height: 35,
    width: 35,
    marginRight: 20,
    backgroundColor: 'rgba(255, 186, 164, 0.29)',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',

    elevation: 1,
    borderRadius: 2,
  },
  container_1: {
    flex: 1,
  },
  button: {
    margin: 20,
    backgroundColor: Color.WHITE,
    padding: 20,
    paddingVertical: 12,
    flexDirection: 'row',

    elevation: 1,
    borderRadius: 5,
  },
});
