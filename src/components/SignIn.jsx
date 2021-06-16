import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';

const styles = StyleSheet.create({
  submitContainer: {
    margin: 10
  }
});

const SignInForm = ({ onSubmit }) => {

  return (
    <View style={{ marginTop: 10 }}>
      <FormikTextInput name="username" placeholder="username" />
      <FormikTextInput name="password" placeholder="password" secureTextEntry={true} />
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
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;