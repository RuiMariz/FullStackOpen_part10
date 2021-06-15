import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { Link } from "react-router-native";
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.appBarText,
  },
  container: {
    marginRight: 10,
  }
});

const AppBarTab = ({ text, link }) => {
  return (
    <Link to={link} component={Pressable} style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </Link>
  );
};

export default AppBarTab;