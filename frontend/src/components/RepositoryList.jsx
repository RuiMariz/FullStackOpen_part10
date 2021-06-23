import React, { useState } from 'react';
import { FlatList, View, StyleSheet, Pressable, Text } from 'react-native';
import { useHistory } from "react-router-native";
import { Picker } from '@react-native-picker/picker';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  sortPicker: {
    height: 50,
    width: '80%'
  },
  sortByText: {
    fontSize:theme.fontSizes.body,
    fontWeight:theme.fontWeights.bold
  },
  sortByContainer: {
    flexDirection: 'row',
    margin:10,
    padding:5,
    backgroundColor:'lightgrey'
  },
});

export const RepositoryListContainer = ({ repositories, history, sortBy, setSortBy }) => {
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
      ListHeaderComponent={() => <SortComponent sortBy={sortBy} setSortBy={setSortBy} />}
    />
  );
};

const SortComponent = ({ sortBy, setSortBy }) => {
  return (
    <View style={styles.sortByContainer}>
      <View style={{ justifyContent: 'center', height: 50}}>
        <Text style={styles.sortByText}>Order By</Text>
      </View>
      <Picker
        selectedValue={sortBy}
        style={styles.sortPicker}
        onValueChange={(itemValue) =>
          setSortBy(itemValue)
        }>
        <Picker.Item label="Latest Repositories" value="latest"/>
        <Picker.Item label="Highest rated Repositories" value="highestRated" />
        <Picker.Item label="Lowest rated Repositories" value="lowestRated" />
      </Picker>
    </View>
  );
};

const RepositoryList = () => {
  const [sortBy, setSortBy] = useState('latest');
  const { repositories } = useRepositories(sortBy);
  const history = useHistory();

  return (
    <RepositoryListContainer repositories={repositories} history={history} sortBy={sortBy} setSortBy={setSortBy} />
  );
};

export default RepositoryList;