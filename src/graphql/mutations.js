import { gql } from "@apollo/client";


export const GET_USER = gql`
  mutation signIn ($username: String!, $password: String!) {
    authenticate (credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`