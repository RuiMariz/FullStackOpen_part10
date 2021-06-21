import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import SignOut from './SignOut';
import SingleRepository from './SingleRepository';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route path="/" exact>
          <RepositoryList />
        </Route>
        <Route path='/sign-in' exact>
          <SignIn />
        </Route>
        <Route path='/sign-out' exact>
          <SignOut />
        </Route>
        <Route path='/repositories/:repositoryID'>
          <SingleRepository />
        </Route>
        <Redirect to="/" />
      </Switch>
    </View>
  );
};

export default Main;