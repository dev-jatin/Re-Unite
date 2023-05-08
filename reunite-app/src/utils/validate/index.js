import {Translation} from '../../../assets';

const validate_field = input => {
  return input === '';
};

const validate_email = input => {
  var validRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  return !validRegex.test(input);
};

const validate_password = input => {
  return input.length < 8;
};

export const login_page_form_validate = (
  email,
  password,
  setEmailError,
  setPasswordError,
) => {
  let emailError = true;
  let passwordError = true;

  validate_field(email)
    ? setEmailError(Translation.English.ENTER_YOUR_EMAIL_ADDRESS)
    : validate_email(email)
    ? setEmailError(Translation.English.EMAIL_ADDRESS_IS_INVALID)
    : (emailError = false);

  validate_field(password)
    ? setPasswordError(Translation.English.ENTER_YOUR_PASSWORD)
    : validate_password(password)
    ? setPasswordError(
        Translation.English.PASSWORD_MUST_BE_AT_LEAST_8_CHARACTER_LONG,
      )
    : (passwordError = false);

  !emailError && setEmailError('');

  !passwordError && setPasswordError('');

  if (emailError || passwordError) {
    return true;
  }

  return false;
};

export const signup_page_form_validate = (
  email,
  password,
  confirmPassword,
  setEmailError,
  setPasswordError,
  setConfirmPasswordError,
) => {
  let emailError = true;
  let passwordError = true;
  let confirmPasswordError = true;

  validate_field(email)
    ? setEmailError(Translation.English.ENTER_YOUR_EMAIL_ADDRESS)
    : validate_email(email)
    ? setEmailError(Translation.English.EMAIL_ADDRESS_IS_INVALID)
    : (emailError = false);

  validate_field(password)
    ? setPasswordError(Translation.English.ENTER_YOUR_PASSWORD)
    : validate_password(password)
    ? setPasswordError(
        Translation.English.PASSWORD_MUST_BE_AT_LEAST_8_CHARACTER_LONG,
      )
    : (passwordError = false);

  validate_field(confirmPassword)
    ? setConfirmPasswordError(Translation.English.PLEASE_ENTER_CONFIRM_PASSWORD)
    : password !== confirmPassword
    ? setConfirmPasswordError(Translation.English.CONFIRM_PASSWORD_NOT_MATCH)
    : (confirmPasswordError = false);

  !emailError && setEmailError('');

  !passwordError && setPasswordError('');

  !confirmPasswordError && setConfirmPasswordError('');

  if (emailError || passwordError || confirmPasswordError) {
    return true;
  }

  return false;
};
