import React from 'react';
import { useParams } from "react-router-native";
import { View, Button, StyleSheet, Linking } from 'react-native';
import useRepository from '../hooks/useRepository';
import RepositoryItem from './RepositoryItem';
import theme from '../theme';

const styles = StyleSheet.create({
  buttonContainer: {
    margin: 20
  }
});

const SingleRepository = () => {
  let { repositoryID } = useParams();
  let { repository } = useRepository(repositoryID);
  
  if (!repository)
    return null;

  return (
    <View>
      <RepositoryItem repository={repository} />
      <View style={styles.buttonContainer}>
        <Button
          title="Open in GitHub"
          onPress={() => { Linking.openURL(repository.url);}}
          color={theme.colors.primary}
        />
      </View>
    </View>
  );
};

export default SingleRepository;