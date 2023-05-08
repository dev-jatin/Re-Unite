import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Color, Font, Routes, Translation} from '../../../assets';
import {normalize, login_page_form_validate} from '../../utils';
import {ScrollView} from 'react-native-gesture-handler';
import {useSetRecoilState} from 'recoil';
import {isLoadingState, userState} from '../../recoil';

const LoginPage = () => {
  const navigation = useNavigation();

  const setUser = useSetRecoilState(userState);
  const setLoading = useSetRecoilState(isLoadingState);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Form validation
  const [validate, setValidate] = useState(false);
  useEffect(() => {
    validate &&
      login_page_form_validate(
        email,
        password,
        setEmailError,
        setPasswordError,
      );
  }, [email, password, validate]);

  const submit = async () => {
    if (
      login_page_form_validate(email, password, setEmailError, setPasswordError)
    ) {
      setValidate(true);
      return;
    }

    setLoading(true);

    const response = await fetch(
      `https://4781hy.deta.dev/login?email=${email}&password=${password}`,
      {
        method: 'POST',
      },
    );

    const json = await response.json();

    setLoading(false);

    console.log('login_page::', json);

    if (json.message === 'success') {
      setUser({
        status: 'loggedIn',
        ...json.res,
      });
    } else {
      ToastAndroid.show('Invalid credential', ToastAndroid.LONG);
    }
  };

  const onSignUp = () => {
    navigation.navigate(Routes.SIGNUP_PAGE);
  };

  return (
    <ScrollView contentContainerStyle={styles.page}>
      {/* Login Card */}
      <View style={styles.loginCard}>
        <Text style={styles.loginText}>{Translation.English.LOGIN}</Text>

        {/* Email Field */}
        <>
          <Text style={styles.label}>{Translation.English.EMAIL}</Text>

          <TextInput
            style={styles.input}
            value={email}
            keyboardType={'email-address'}
            onChangeText={setEmail}
          />

          {emailError && <Text style={styles.errorText}>{emailError}</Text>}
        </>

        <View style={styles.space} />

        {/* Password Field */}
        <>
          <Text style={styles.label}>{Translation.English.PASSWORD}</Text>

          <TextInput
            style={styles.input}
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />

          {passwordError && (
            <Text style={styles.errorText}>{passwordError}</Text>
          )}
        </>

        <View style={styles.space} />
        <View style={styles.space} />

        {/* Login Button */}
        <TouchableOpacity style={styles.button} onPress={submit}>
          <Text style={styles.buttonText}>{Translation.English.SUBMIT}</Text>
        </TouchableOpacity>

        <View style={styles.space} />
        <View style={styles.space} />

        <Text style={styles.footerText}>
          {Translation.English.DONT_HAVE_AN_ACCOUNT}{' '}
          <Text style={styles.linkText} onPress={onSignUp}>
            {Translation.English.SIGNUP}
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  page: {
    flexGrow: 1,
    padding: '5%',
    justifyContent: 'center',
    backgroundColor: Color.BACKGROUND,
  },
  loginCard: {
    padding: '5%',
    paddingVertical: 40,
    elevation: 3,
    borderRadius: normalize(5),
    backgroundColor: Color.WHITE,
  },
  loginText: {
    fontSize: normalize(36),
    color: Color.BLACK,
    textAlign: 'center',
    fontFamily: Font.POPPINS_SEMIBOLD,
  },
  label: {
    fontSize: normalize(12),
    color: Color.BLACK,
    lineHeight: normalize(25),
    fontFamily: Font.POPPINS_REGULAR,
  },
  input: {
    borderWidth: 1,
    borderColor: Color.BLACK,
    borderRadius: normalize(5),
    fontFamily: Font.POPPINS_MEDIUM,
    fontSize: normalize(12),
    paddingHorizontal: '5%',
    paddingVertical: '2%',
  },
  errorText: {
    color: Color.RED,
  },
  space: {
    height: 10,
  },
  button: {
    backgroundColor: Color.SECONDARY,
    alignItems: 'center',
    borderRadius: normalize(5),
  },
  buttonText: {
    fontSize: normalize(18),
    color: Color.WHITE,
    lineHeight: normalize(40),
    fontFamily: Font.POPPINS_MEDIUM,
  },
  footerText: {
    fontSize: normalize(12),
    color: Color.BLACK,
    lineHeight: normalize(25),
    textAlign: 'center',
    fontFamily: Font.POPPINS_LIGHT,
  },
  linkText: {
    color: Color.SECONDARY,
  },
});

export default LoginPage;
