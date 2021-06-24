import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { format, parseISO } from 'date-fns';
import theme from '../theme';

const styles = StyleSheet.create({
  reviewContainer: {
    flexDirection: 'row',
    marginBottom: 10
  },
  ratingContainer: {
    borderColor: theme.colors.primary,
    borderWidth: 3,
    width: 60,
    height: 60,
    justifyContent: 'center',
    borderRadius: 60 / 2,
    margin: 10,
    marginTop: 0
  },
  ratingText: {
    color: theme.colors.primary,
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
    alignSelf: 'center',
  },
  name: {
    fontWeight: theme.fontWeights.bold
  },
  reviewInfoContainer: {
    flex: 1,
    marginRight: 10
  },
  reviewTextContainer: {
    marginTop: 5
  }
});

const ReviewItem = ({ review, myReviews }) => {
  return (
    <View style={styles.reviewContainer}>
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>
          {review.rating}
        </Text>
      </View>
      <View style={styles.reviewInfoContainer}>
        {myReviews ?
          <Text style={styles.name} >{`${review.repository.ownerName}/${review.repository.name}`}</Text>
          : <Text style={styles.name} >{review.user.username}</Text>
        }
        <Text style={styles.review}>{format(parseISO(review.createdAt), 'dd/MM/yyyy')}</Text>
        <View style={styles.reviewTextContainer}>
          <Text>{review.text}</Text>
        </View>
      </View>
    </View>
  );
};

export default ReviewItem;