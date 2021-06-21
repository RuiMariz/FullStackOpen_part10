import React from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useHistory } from "react-router-native";
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

export const RepositoryListContainer = ({ repositories, history }) => {
  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  const ItemSeparator = () => <View style={styles.separator} />;

  const renderItem = ({ item }) => (
    <PressableRepositoryItem repository={item} />
  );

  const PressableRepositoryItem = ({ repository }) => {
    const onPress = () => {
      history.push(`/repositories/${repository.id}`);
    };

    return (
      <Pressable onPress={onPress} >
        <RepositoryItem repository={repository} />
      </Pressable>
    );
  };

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  );
};

const RepositoryList = () => {
  const { repositories } = useRepositories();
  const history = useHistory();

  return (
    <RepositoryListContainer repositories={repositories} history={history}/>
  );
};

export default RepositoryList;