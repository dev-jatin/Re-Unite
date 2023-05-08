import React, {useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {Color, Translation, Font, Svg, Routes} from '../../../assets';
import {normalize} from '../../utils';
import {imagePickerState, imageState, userState} from '../../recoil';
import {isLoadingState} from '../../recoil/loading';
import {SvgCss} from 'react-native-svg';
import Selector from './component/selector/selector';
import {useNavigation} from '@react-navigation/native';

const RaiseComplaint = () => {
  // Global State
  const image = useRecoilValue(imageState);
  const user = useRecoilValue(userState);
  const navigation = useNavigation();

  const setImagePicker = useSetRecoilState(imagePickerState);
  const setLoading = useSetRecoilState(isLoadingState);

  // Local State
  const [name, setName] = useState();
  const [age, setAge] = useState(1);
  const [eyecolor, setEye] = useState('Amber');
  const [skin, setSkinTone] = useState('Fair');
  const [hair, setHairColor] = useState('Black');
  const [height, setHeight] = useState(1);
  const [weight, setWeight] = useState(1);

  const [nameError, setNameError] = useState();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('age');

  const openImagePicker = () => {
    setImagePicker(true);
  };

  const raiseComplaint = async () => {
    setLoading(true);

    try {
      if (!user?.address) {
        Alert.alert(
          'Please complete your profile before raising the complaint',
        );
        setLoading(false);
        return;
      }

      if (!name) {
        // setNameError('Please enter name');
        Alert.alert('Please enter name');
        setLoading(false);
        return;
      }

      if (!age) {
        Alert.alert('Please enter age');
        setLoading(false);
        return;
      }

      if (!eyecolor) {
        Alert.alert('Please enter eye color');
        setLoading(false);
        return;
      }

      if (!skin) {
        Alert.alert('Please enter skin tone');
        setLoading(false);
        return;
      }

      if (!hair) {
        Alert.alert('Please enter hair color');
        setLoading(false);
        return;
      }

      if (!height) {
        Alert.alert('Please enter height');
        setLoading(false);
        return;
      }

      if (!weight) {
        Alert.alert('Please enter weight');
        setLoading(false);
        return;
      }

      if (!image) {
        Alert.alert('Please select image');
        setLoading(false);
        return;
      }

      var formdata = new FormData();
      formdata.append('file', image);

      var requestOptions = {
        method: 'POST',
        body: formdata,
      };

      const response = await fetch(
        `https://4781hy.deta.dev/complaints?userId=${user?.key}&name=${name}&age=${age}&eyeColor=${eyecolor}&faceColor=${skin}&hairColor=${hair}&height=${height}&weight=${weight}`,
        requestOptions,
      );
      const json = await response.json();

      console.log('JSON::', json);

      // Alert.alert(json.message ? json.message : json);
      if (json?.message === 'success') {
        ToastAndroid.show(
          'Raise your complaint successfully',
          ToastAndroid.LONG,
        );

        navigation.popToTop();
        navigation.navigate(Routes.MY_COMPLAINT_PAGE);
      } else {
        ToastAndroid.show(
          'Something Went Wrong. Please try agian later',
          ToastAndroid.LONG,
        );
      }
    } catch {
      ToastAndroid.show(
        'Something Went Wrong. Please try agian later',
        ToastAndroid.LONG,
      );
    }

    setLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <Selector
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        modalType={modalType}
        data={
          modalType === 'age'
            ? [...Array.from({length: 100}, (_, i) => i + 1)]
            : modalType === 'eyecolor'
            ? ['Amber', 'Blue', 'Brown', 'Gray', 'Green', 'Hazel', 'Red']
            : modalType === 'skintone'
            ? ['Fair', 'Medium', 'Olive', 'Brown', 'Black']
            : modalType === 'hair'
            ? ['Black', 'Brown', 'Red', 'White']
            : modalType === 'weight'
            ? [...Array.from({length: 100}, (_, i) => i + 1)]
            : [...Array.from({length: 100}, (_, i) => i + 1)]
        }
        setState={
          modalType === 'age'
            ? setAge
            : modalType === 'eyecolor'
            ? setEye
            : modalType === 'skintone'
            ? setSkinTone
            : modalType === 'hair'
            ? setHairColor
            : modalType === 'weight'
            ? setWeight
            : setHeight
        }
      />

      <TouchableOpacity style={styles.button} onPress={openImagePicker}>
        <Text style={styles.buttonText}>Select Image</Text>
      </TouchableOpacity>

      {image && <Image style={styles.image} source={{uri: image?.uri}} />}

      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.textInput}
        value={name}
        onChangeText={setName}
        placeholder={'Enter name'}
      />
      {nameError && <Text style={styles.errorText}>{nameError}</Text>}

      <Text style={styles.label}>Select Age</Text>
      <TouchableOpacity
        onPress={() => {
          setModalType('age');
          setModalVisible(true);
        }}
        style={styles.selector}>
        <Text style={styles.text}>{age}</Text>
        <SvgCss xml={Svg.ARROW_DOWN_ICON} />
      </TouchableOpacity>

      <Text style={styles.label}>Eye color</Text>
      <TouchableOpacity
        onPress={() => {
          setModalType('eyecolor');
          setModalVisible(true);
        }}
        style={styles.selector}>
        <Text style={styles.text}>{eyecolor}</Text>
        <SvgCss xml={Svg.ARROW_DOWN_ICON} />
      </TouchableOpacity>

      <Text style={styles.label}>Skin tone</Text>
      <TouchableOpacity
        onPress={() => {
          setModalType('skintone');
          setModalVisible(true);
        }}
        style={styles.selector}>
        <Text style={styles.text}>{skin}</Text>
        <SvgCss xml={Svg.ARROW_DOWN_ICON} />
      </TouchableOpacity>

      <Text style={styles.label}>Hair color</Text>
      <TouchableOpacity
        onPress={() => {
          setModalType('hair');
          setModalVisible(true);
        }}
        style={styles.selector}>
        <Text style={styles.text}>{hair}</Text>
        <SvgCss xml={Svg.ARROW_DOWN_ICON} />
      </TouchableOpacity>

      <Text style={styles.label}>Height (in inches)</Text>
      <TouchableOpacity
        onPress={() => {
          setModalType('height');
          setModalVisible(true);
        }}
        style={styles.selector}>
        <Text style={styles.text}>{height}</Text>
        <SvgCss xml={Svg.ARROW_DOWN_ICON} />
      </TouchableOpacity>

      <Text style={styles.label}>Weight (in Kg)</Text>
      <TouchableOpacity
        onPress={() => {
          setModalType('weight');
          setModalVisible(true);
        }}
        style={styles.selector}>
        <Text style={styles.text}>{weight}</Text>
        <SvgCss xml={Svg.ARROW_DOWN_ICON} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={raiseComplaint}>
        <Text style={styles.buttonText}>{Translation.English.SUBMIT} </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default RaiseComplaint;

const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  label: {
    fontSize: 12,
    color: 'black',
    fontFamily: Font.POPPINS_REGULAR,
    marginBottom: 2,
  },
  textInput: {
    borderWidth: 1,
    borderColor: Color.BLACK,
    borderRadius: normalize(5),
    fontFamily: Font.POPPINS_MEDIUM,
    fontSize: normalize(12),
    paddingHorizontal: '5%',
    paddingVertical: '2%',
    height: 40,
    marginBottom: 15,
  },
  selector: {
    borderWidth: 1,
    borderColor: Color.BLACK,
    borderRadius: normalize(5),
    paddingHorizontal: '5%',
    paddingVertical: '2%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  text: {
    fontFamily: Font.POPPINS_MEDIUM,
    fontSize: normalize(12),
    flex: 1,
    color: 'black',
  },
  image: {
    height: 400,
    resizeMode: 'contain',
  },
  button: {
    backgroundColor: Color.SECONDARY,
    alignItems: 'center',
    borderRadius: normalize(5),
    marginBottom: 15,
  },
  buttonText: {
    fontSize: normalize(18),
    color: Color.WHITE,
    lineHeight: normalize(40),
    fontFamily: Font.POPPINS_MEDIUM,
  },
});
