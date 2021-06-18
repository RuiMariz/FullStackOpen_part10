import { gql } from '@apollo/client';

const REPOSITORY_DETAILS = gql`
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

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges{
        node{
          ...RepositoryDetails
        }
      }
    }
  }
${REPOSITORY_DETAILS}
`;