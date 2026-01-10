import { gql } from '@apollo/client';

import { GET_REPOS_FRAGMENT } from './fragments';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      ...RepositoriesFragment
    }
  }
  
  ${GET_REPOS_FRAGMENT}
`


export const CURRENT_USER = gql`
  query {
    me {
      id
      username
    }
  }
`

export const SINGLE_REPO = gql`
  query singleRepo ($id: ID!) {
    repository (id: $id) {
      id
      fullName
      description
      language
      forksCount
      stargazersCount
      ratingAverage
      reviewCount
      ownerAvatarUrl
      url
      reviews {
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
        }
      }
    }
  }
`