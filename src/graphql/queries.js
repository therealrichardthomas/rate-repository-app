import { gql } from '@apollo/client';

import { GET_REPOS_FRAGMENT } from './fragments';

export const GET_REPOSITORIES = gql`
  query allRepositories ($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String!){
    repositories (orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
      ...RepositoriesFragment
    }
  }
  
  ${GET_REPOS_FRAGMENT}
`


export const CURRENT_USER = gql`
  query getCurrentUser($includeReviews: Boolean = false){
    me {
      id
      username
      reviews @include(if: $includeReviews){
        edges {
          node {
            id
            rating
            createdAt
            text
            repository {
              fullName
              url
              id
            }
          }
        }
      }
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