import React from 'react';
import { View, StyleSheet, Text, Button, Alert } from 'react-native';
import { format, parseISO } from 'date-fns';
import { useHistory } from "react-router-native";
import theme from '../theme';
import useDeleteReview from '../hooks/useDeleteReview';

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
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  buttonContainer: {
    width: '45%',
    alignContent: 'space-around',
    marginHorizontal: '2.5%'
  }
});

const ReviewItem = ({ review, myReviews, refetch }) => {
  const history = useHistory();
  const [deleteReview] = useDeleteReview();

  const createRemoveReviewAlert = () =>
    Alert.alert(
      "Delete Review?",
      "Are you sure you want do delete the review?",
      [
        {
          text: "Cancel",
        },
        {
          text: "OK", onPress: async () => {
            await deleteReview({ id: review.id });
            refetch();
          }
        }
      ]
    );

  const goToRepository = () => {
    history.push(`/repositories/${review.repositoryId}`);
  };

  return (
    <View style={{ flexDirection: 'column' }}>
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
      {myReviews &&
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <Button
              title="View Repository"
              onPress={goToRepository}
              color={theme.colors.primary}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title="Delete Review"
              onPress={createRemoveReviewAlert}
              color={theme.colors.error}
            />
          </View>
        </View>
      }
    </View>
  );
};

export default ReviewItem;