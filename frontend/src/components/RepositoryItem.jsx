import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Text from './Text';
import theme from '../theme';
import { convertToThousands } from '../utils';

const styles = StyleSheet.create({
  tinyImage: {
    width: 50,
    height: 50,
  },
  repoInfoContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 10,
  },
  infoContainer: {
    flexDirection: 'column',
    marginLeft: 10,
    marginRight: 10,
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
  },
  languageContainer: {
    alignSelf: 'baseline'
  },
  language: {
    color: 'white',
    backgroundColor: theme.colors.primary,
    padding: 2,
    borderRadius: 2
  },
  repoStatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  repoStatContainer: {
    alignItems: 'center'
  },
  repoStat: {
    fontWeight: 'bold',
  }
});

const RepositoryItem = ({ repository }) => {
  return (
    <View>
      <View style={styles.repoInfoContainer}>
        <Image
          style={styles.tinyImage}
          source={{
            uri: repository.ownerAvatarUrl,
          }}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.name} testID="fullName">{repository.fullName}</Text>
          <Text testID='description'>{repository.description}</Text>
          <View style={styles.languageContainer}>
            <Text style={styles.language} testID='language'>{repository.language}</Text>
          </View>
        </View>
      </View>
      <View style={styles.repoStatsContainer}>
        <View style={styles.repoStatContainer}>
          <Text style={styles.repoStat} testID='stars'>{convertToThousands(repository.stargazersCount)}</Text>
          <Text>Stars</Text>
        </View>
        <View style={styles.repoStatContainer}>
          <Text style={styles.repoStat} testID='forks'>{convertToThousands(repository.forksCount)}</Text>
          <Text>Forks</Text>
        </View>
        <View style={styles.repoStatContainer}>
          <Text style={styles.repoStat} testID='reviews'>{convertToThousands(repository.reviewCount)}</Text>
          <Text>Reviews</Text>
        </View>
        <View style={styles.repoStatContainer}>
          <Text style={styles.repoStat} testID='rating'>{repository.ratingAverage}</Text>
          <Text>Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;