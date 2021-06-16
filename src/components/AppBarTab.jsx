import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { Link } from "react-router-native";
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.appBarText,
    fontWeight:theme.fontWeights.bold,
    fontSize:15,
    padding:10
  },
});

const AppBarTab = ({ text, link }) => {
  return (
    <Link to={link} component={Pressable}>
      <Text style={styles.text}>{text}</Text>
    </Link>
  );
};

export default AppBarTab;