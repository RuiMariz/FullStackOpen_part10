import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { useQuery } from "@apollo/client";
import theme from '../theme';
import AppBarTab from './AppBarTab';
import { GET_AUTHORIZED_USER } from '../graphql/queries';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
    flexDirection: 'row',
  }
});

const AppBar = () => {
  const { data } = useQuery(GET_AUTHORIZED_USER);
  const user = data && data.authorizedUser;

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab text='Repositories' link={'/'} />
        {user ?
          <View style={{ flexDirection: 'row' }}>
            <AppBarTab text='Create review' link={'/create-review'} />
            <AppBarTab text='Sign out' link={'/sign-out'} />
          </View>
          : <View style={{ flexDirection: 'row' }}>
            <AppBarTab text='Sign up' link={'/sign-up'} />
            <AppBarTab text='Sign in' link={'/sign-in'} />
          </View>
        }
      </ScrollView>
    </View>
  );
};

export default AppBar;