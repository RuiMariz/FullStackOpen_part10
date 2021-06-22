import React from 'react';
import { useParams } from "react-router-native";
import { View, Button, StyleSheet, Linking, FlatList } from 'react-native';
import useRepository from '../hooks/useRepository';
import RepositoryItem from './RepositoryItem';
import Review from './ReviewItem';
import theme from '../theme';

const styles = StyleSheet.create({
  buttonContainer: {
    margin: 20
  },
  separator: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    margin:10,
    marginTop:5
  },
});

const SingleRepository = () => {
  let { repositoryID } = useParams();
  let { repository } = useRepository(repositoryID);

  if (!repository)
    return null;

  const RepositoryHeader = () => {
    return (
      <View>
        <RepositoryItem repository={repository} />
        <View style={styles.buttonContainer}>
          <Button
            title="Open in GitHub"
            onPress={() => { Linking.openURL(repository.url); }}
            color={theme.colors.primary}
          />
        </View>
      </View>
    );
  };
  const ItemSeparator = () => <View style={styles.separator} />;

  return (
    <FlatList
      data={repository.reviews.edges}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <Review review={item.node} />}
      keyExtractor={item => item.node.id}
      ListHeaderComponent={() => <RepositoryHeader/>}
    />
  );
};

export default SingleRepository;