import { gql } from '@apollo/client';

export const REPOSITORY_DETAILS = gql`
  fragment RepositoryDetails on Repository {
    id				
    fullName
    description
    language
    language
    forksCount
    stargazersCount
    ratingAverage
    reviewCount
    ownerAvatarUrl    
  }
`;