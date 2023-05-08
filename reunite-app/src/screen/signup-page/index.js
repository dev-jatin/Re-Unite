import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Color, Font, Routes, Translation} from '../../../assets';
import {normalize} from '../../utils';
import {signup_page_form_validate} from '../../utils/validate';
import {useSetRecoilState} from 'recoil';
import {isLoadingState, userState} from '../../recoil';

const SignUpPage = () => {
  const navigation = useNavigation();

  const setUser = useSetRecoilState(userState);
  const setLoading = useSetRecoilState(isLoadingState);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const [validate, setValidate] = useState(false);
  useEffect(() => {
    validate &&
      signup_page_form_validate(
        email,
        password,
        confirmPassword,
        setEmailError,
        setPasswordError,
        setConfirmPasswordError,
      );
  }, [email, password, validate, confirmPassword]);

  const submit = async () => {
    if (
      signup_page_form_validate(
        email,
        password,
        confirmPassword,
        setEmailError,
        setPasswordError,
        setConfirmPasswordError,
      )
    ) {
      setValidate(true);
      return;
    }

    setLoading(true);

    const response = await fetch(
      `https://4781hy.deta.dev/signup?email=${email}&password=${password}`,
      {
        method: 'POST',
      },
    );

    const json = await response.json();

    setLoading(false);

    console.log('signup_page::', json);

    if (json.message === 'success') {
      setUser({
        status: 'loggedIn',
        ...json.result,
      });
    } else {
      ToastAndroid.show('User already exists', ToastAndroid.LONG);
    }
  };

  const onLogin = () => {
    navigation.navigate(Routes.LOGIN_PAGE);
  };

  return (
    <ScrollView contentContainerStyle={styles.page}>
      {/* SignUpCard */}
      <View style={styles.signUpCard}>
        <Text style={styles.loginText}>Sign Up</Text>

        {/* Email Field */}
        <>
          <Text style={styles.label}>Email</Text>

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
          <Text style={styles.label}>Password</Text>

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

        {/* Confirm Password Field */}
        <>
          <Text style={styles.label}>Confirm Password</Text>

          <TextInput
            style={styles.input}
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          {confirmPasswordError && (
            <Text style={styles.errorText}>{confirmPasswordError}</Text>
          )}
        </>

        <View style={styles.space} />
        <View style={styles.space} />

        <TouchableOpacity style={styles.button} onPress={() => submit()}>
          <Text style={styles.buttonText}>{Translation.English.SUBMIT}</Text>
        </TouchableOpacity>

        <View style={styles.space} />
        <View style={styles.space} />

        <Text style={styles.footerText}>
          Already have an account?{' '}
          <Text style={styles.linkText} onPress={onLogin}>
            Login
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
  signUpCard: {
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
export default SignUpPage;
