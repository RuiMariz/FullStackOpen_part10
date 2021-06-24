import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import useUser from '../hooks/useUser';
import ReviewItem from './ReviewItem';

const styles = StyleSheet.create({
  buttonContainer: {
    margin: 20
  },
  separator: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    margin: 10,
    marginTop: 5
  },
});

const MyReviews = () => {
  let { user, fetchMore } = useUser();

  if (!user)
    return null;

  const ItemSeparator = () => <View style={styles.separator} />;
  const onEndReach = () => {
    fetchMore();
  };

  return (
    <FlatList
      data={user.reviews.edges}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item.node} myReviews={true} />}
      keyExtractor={item => item.node.id}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
      style={{ marginTop: 20 }}
    />
  );
};

export default MyReviews;