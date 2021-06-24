import { gql } from '@apollo/client';
import { REPOSITORY_DETAILS } from './fragments';

export const GET_REPOSITORIES = gql`
  query repositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String, $first: Int, $after: String) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword, first: $first, after: $after){
      edges{
        node{
              ...RepositoryDetails
        }
        cursor
      }
      pageInfo{
        startCursor
        endCursor
        hasNextPage
      }
    }
  }
${REPOSITORY_DETAILS}
`;

export const GET_AUTHORIZED_USER = gql`
  query ($includeReviews: Boolean = false, $first: Int, $after: String){
    authorizedUser {
      id
      username
      reviews(first: $first, after: $after) @include(if: $includeReviews) {
        pageInfo{
          startCursor
          endCursor
          hasNextPage
        }
        edges{
          cursor
          node{
            repositoryId
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
            repository{
              ownerName
              name
            }
          }
        }
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  query repository($id: ID!, $first: Int, $after: String ) {
    repository(id: $id) {
      ...RepositoryDetails
      reviews(first: $first, after: $after) {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
          cursor
        }
        pageInfo{
          startCursor
          endCursor
          hasNextPage
        }
      }
    }
  }
${REPOSITORY_DETAILS}
`;