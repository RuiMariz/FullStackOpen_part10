import React, { useState } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useHistory } from "react-router-native";
import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import useSignUp from '../hooks/useSignUp';
import useSignIn from '../hooks/useSignIn';

const styles = StyleSheet.create({
  submitContainer: {
    margin: 10
  },
  errorText: {
    fontSize: 15,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.error,
    textAlign: 'center',
    padding: 5
  },
});
const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(1, 'Username has minimum length of 1')
    .max(30, 'Username has maximum length of 30'),
  password: yup
    .string()
    .required('Password is required')
    .min(5, 'Password has minimum length of 5')
    .max(50, 'Password has maximum length of 50'),
  confirmPassword: yup
    .string()
    .required('Password Confirmation is required')
    .oneOf([yup.ref('password')],
      'Passwords do not match'),
});

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={{ marginTop: 10 }}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry={true} />
      <FormikTextInput name="confirmPassword" placeholder="Password Confirmation" secureTextEntry={true} />
      <View style={styles.submitContainer}>
        <Button
          title="Sign up"
          onPress={onSubmit}
          color={theme.colors.primary}
        />
      </View>
    </View>
  );
};

export const SignUpContainer = ({ onSubmit }) => {
  const initialValues = {
    username: '',
    password: '',
    confirmPassword: ''
  };

  return (
    <Formik initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

let previousTimeOutId = null;

const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      await signUp({ username, password });
      await signIn({ username, password });
      history.push('/');
    } catch (e) {
      showErrorMessage(e.message);
      console.log(e);
    }
  };

  const showErrorMessage = (message) => {
    setErrorMessage(message);
    clearTimeout(previousTimeOutId);
    previousTimeOutId = setTimeout(() => {
      setErrorMessage('');
    }, 5000);
  };

  return (
    <View>
      {errorMessage !== '' && <Text style={styles.errorText}>{errorMessage}</Text>}
      <SignUpContainer onSubmit={onSubmit} />
    </View>
  );
};

export default SignUp;