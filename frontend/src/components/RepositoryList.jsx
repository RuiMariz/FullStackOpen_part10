import React, { useState } from 'react';
import { FlatList, View, StyleSheet, Pressable, Text } from 'react-native';
import { useHistory } from "react-router-native";
import { Picker } from '@react-native-picker/picker';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from "use-debounce";
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
    fontSize: theme.fontSizes.body,
    fontWeight: theme.fontWeights.bold,
  },
  sortByContainer: {
    flexDirection: 'row',
    margin: 10,
    paddingHorizontal: 10,
    borderColor: 'lightgrey',
    borderWidth: 2,
    borderRadius: 10,
  },
  searchBarContainer: {
    margin: 10,
    marginBottom: 0,
  }
});

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { sortBy, setSortBy, search, setSearch } = this.props;

    return (
      <View>
        <View style={styles.searchBarContainer}>
          <Searchbar
            placeholder="Search"
            onChangeText={(itemValue) =>
              setSearch(itemValue)
            }
            value={search}
          />
        </View>
        <View style={styles.sortByContainer}>
          <View style={{ justifyContent: 'center', height: 50 }}>
            <Text style={styles.sortByText}>Order By</Text>
          </View>
          <Picker
            selectedValue={sortBy}
            style={styles.sortPicker}
            onValueChange={(itemValue) =>
              setSortBy(itemValue)
            }>
            <Picker.Item label="Latest Repositories" value="latest" />
            <Picker.Item label="Highest rated Repositories" value="highestRated" />
            <Picker.Item label="Lowest rated Repositories" value="lowestRated" />
          </Picker>
        </View>
      </View>
    );
  };


  render() {
    const { repositories, history } = this.props;

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
        ListHeaderComponent={this.renderHeader}
      />
    );
  }
}

const RepositoryList = () => {
  const [sortBy, setSortBy] = useState('latest');
  const [search, setSearch] = useState('');
  const [searchDebounce] = useDebounce(search, 500);
  const { repositories } = useRepositories(sortBy, searchDebounce);
  const history = useHistory();

  return (
    <RepositoryListContainer repositories={repositories} history={history} sortBy={sortBy} setSortBy={setSortBy} search={search} setSearch={setSearch} />
  );
};

export default RepositoryList;