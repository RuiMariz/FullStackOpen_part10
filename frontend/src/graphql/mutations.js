import { gql } from '@apollo/client';

export const AUTHORIZE = gql`
  mutation Authorize($input: AuthorizeInput) {
    authorize(credentials: $input) {
      accessToken
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput){
    createUser(user: $input){
      id
      username
    }
  }
`;