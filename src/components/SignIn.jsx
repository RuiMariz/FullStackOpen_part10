import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';

const styles = StyleSheet.create({
  submitContainer: {
    margin: 10
  }
});
const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
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

const SignIn = () => {
  const onSubmit = (values) => {
    const { username, password } = values;
    console.log(username);
    console.log(password);
  };
  const initialValues = {
    username: '',
    password: '',
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;