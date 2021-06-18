import React, { useState } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useHistory } from "react-router-native";
import FormikTextInput from './FormikTextInput';
import theme from '../theme';
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
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required')
});

const SignInForm = ({ onSubmit }) => {

  return (
    <View style={{ marginTop: 10 }}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry={true} />
      <View style={styles.submitContainer}>
        <Button
          title="Sign in"
          onPress={onSubmit}
          color={theme.colors.primary}
        />
      </View>
    </View>
  );
};

let previousTimeOutId = null;

const SignIn = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [signIn] = useSignIn();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
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

  const initialValues = {
    username: '',
    password: '',
  };

  return (
    <View>
      {errorMessage !== '' && <Text style={styles.errorText}>{errorMessage}</Text>}
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

export default SignIn;