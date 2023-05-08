import {Image, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import React, {useState} from 'react';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {
  imagePickerState,
  imageState,
  isLoadingState,
  userState,
} from '../../recoil';

import {SvgCss} from 'react-native-svg';
import {Color, Font, Svg} from '../../../assets';
import {normalize} from '../../utils';
import {Pressable} from 'react-native';
import {useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';

const ProfilePage = () => {
  const [user, setUser] = useRecoilState(userState);
  const isFocused = useIsFocused();
  const setLoading = useSetRecoilState(isLoadingState);

  const [chooseImage, setChooseImage] = useRecoilState(imageState);

  const setImagePicker = useSetRecoilState(imagePickerState);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(
    'https://4781hy.deta.dev/image/blank-profile-picture-973460_640.webp',
  );
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [pinCode, setPinCode] = useState('');

  const [nameError, setNameError] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [cityError, setCityError] = useState('');
  const [countryError, setCountryError] = useState('');
  const [pinCodeError, setPinCodeError] = useState('');

  const onLogout = () => {
    setUser({
      status: 'loggedOut',
    });
  };

  useEffect(() => {
    if (name) {
      setNameError('');
    }
  }, [name]);

  useEffect(() => {
    if (mobile) {
      setMobileError('');
    }
  }, [mobile]);

  useEffect(() => {
    if (address) {
      setAddressError('');
    }
  }, [address]);

  useEffect(() => {
    if (city) {
      setCityError('');
    }
  }, [city]);

  useEffect(() => {
    if (country) {
      setCountryError('');
    }
  }, [country]);

  useEffect(() => {
    if (pinCode) {
      setPinCodeError('');
    }
  }, [pinCode]);

  const onUpdate = async () => {
    if (name === '') {
      setNameError('Please enter your name');
      return;
    } else if (mobile === '') {
      setMobileError('Please enter phone number');
      return;
    } else if (address === '') {
      setAddressError('Please enter address');
      return;
    } else if (city === '') {
      setCityError('Please enter city');
      return;
    } else if (country === '') {
      setCountryError('Please enter country');
      return;
    } else if (pinCode === '') {
      setPinCodeError('Please enter pincode');
      return;
    }

    setLoading(true);

    if (chooseImage) {
      var formdata = new FormData();
      formdata.append('file', chooseImage);

      var requestOptions = {
        method: 'PUT',
        body: formdata,
      };
    } else {
      var requestOptions = {
        method: 'PUT',
      };
    }

    const response = await fetch(
      `https://4781hy.deta.dev/update?key=${user?.key}&name=${name}&mobNo=${mobile}&address=${address}&city=${city}&country=${country}&pincode=${pinCode}`,
      requestOptions,
    );
    const json = await response.json();
    console.log('json::', json);

    if (json.message === 'success') {
      setUser({
        ...user,
        ...json.res,
      });
      ToastAndroid.show('Profile Updated Successfully', ToastAndroid.LONG);
      setChooseImage('');
    } else {
      ToastAndroid.show('Something went wrong', ToastAndroid.LONG);
    }

    setLoading(false);
  };

  const openImagePicker = () => {
    setImagePicker(true);
  };

  useEffect(() => {
    setChooseImage('');

    if (user?.profilePic) {
      setImage(user?.profilePic);
    }

    if (user?.name) {
      setName(user?.name);
    }

    if (user?.email) {
      setEmail(user?.email);
    }

    if (user?.mobNo) {
      setMobile(user?.mobNo);
    }

    if (user?.address) {
      setAddress(user?.address);
    }

    if (user?.city) {
      setCity(user?.city);
    }

    if (user?.country) {
      setCountry(user?.country);
    }

    if (user?.pincode) {
      setPinCode(user?.pincode);
    }
  }, [user, isFocused, setChooseImage]);

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <View style={styles.container_3}>
        <View style={styles.container_2}>
          <Image
            style={styles.image}
            source={{uri: chooseImage ? chooseImage?.uri : image}}
          />
          <Pressable onPress={openImagePicker} style={styles.image_button}>
            <SvgCss height={30} width={30} xml={Svg.PICK_IMAGE_ICON} />
          </Pressable>
        </View>

        <TouchableOpacity onPress={onLogout}>
          <Text style={styles.logout}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View>
        <Text style={styles.label}>Name </Text>
        <TextInput
          style={styles.textInput}
          value={name}
          onChangeText={setName}
        />
        {nameError && <Text style={styles.errorText}>{nameError}</Text>}
      </View>

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.textInput}
        value={email}
        onChangeText={setEmail}
        editable={false}
      />

      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.textInput}
        value={mobile}
        onChangeText={setMobile}
        keyboardType={'numeric'}
      />
      {mobileError && <Text style={styles.errorText}>{mobileError}</Text>}

      <Text style={styles.label}>Address</Text>
      <TextInput
        style={styles.textInput}
        value={address}
        onChangeText={setAddress}
      />
      {addressError && <Text style={styles.errorText}>{addressError}</Text>}

      <Text style={styles.label}>City</Text>
      <TextInput style={styles.textInput} value={city} onChangeText={setCity} />
      {cityError && <Text style={styles.errorText}>{cityError}</Text>}

      <Text style={styles.label}>Country</Text>
      <TextInput
        style={styles.textInput}
        value={country}
        onChangeText={setCountry}
      />
      {countryError && <Text style={styles.errorText}>{countryError}</Text>}

      <Text style={styles.label}>Pincode</Text>
      <TextInput
        style={styles.textInput}
        value={pinCode}
        onChangeText={setPinCode}
      />
      {pinCodeError && <Text style={styles.errorText}>{pinCodeError}</Text>}

      <TouchableOpacity style={styles.button} onPress={onUpdate}>
        <Text style={styles.buttonText}>Update </Text>
      </TouchableOpacity>

      {/* <Text>Change Pasword</Text> */}
    </ScrollView>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  image: {
    borderRadius: 40,
    height: 80,
    width: 80,
    borderWidth: 1,
    borderColor: 'black',
  },
  image_button: {
    height: 30,
    width: 30,
    position: 'absolute',
    bottom: -5,
    right: -5,
    borderWidth: 1,
    borderRadius: 15,
  },
  label: {
    fontSize: 12,
    color: 'black',
    fontFamily: Font.POPPINS_REGULAR,
    marginVertical: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: Color.BLACK,
    borderRadius: normalize(5),
    fontFamily: Font.POPPINS_MEDIUM,
    fontSize: normalize(12),
    paddingHorizontal: '5%',
    paddingVertical: '2%',
  },
  container_1: {
    flexDirection: 'row',
  },
  container_2: {
    height: 80,
    width: 80,
    marginVertical: 20,
  },
  container_3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: 'white',
  },
  button: {
    backgroundColor: Color.SECONDARY,
    alignItems: 'center',
    borderRadius: normalize(5),
    marginVertical: 20,
  },
  buttonText: {
    fontSize: normalize(18),
    color: Color.WHITE,
    lineHeight: normalize(40),
    fontFamily: Font.POPPINS_MEDIUM,
  },
  logout: {
    padding: 10,
    paddingTop: 6,
    paddingBottom: 4,
    borderWidth: 1,
    borderColor: Color.SECONDARY,
    color: Color.SECONDARY,
    borderRadius: 4,
    fontFamily: Font.POPPINS_REGULAR,
    textAlign: 'center',
  },
  errorText: {
    color: Color.RED,
  },
});
