import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: theme.colors.inputBorder,
    borderWidth: 1.5,
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  textInputError: {
    height: 40,
    borderColor: theme.colors.error,
    borderWidth: 1.5,
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },

});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = error ? styles.textInputError : styles.textInput;

  return <NativeTextInput style={style, textInputStyle} {...props} />;
};

export default TextInput;