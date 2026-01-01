import { gql } from '@apollo/client';


export const GET_REPOS_FRAGMENT = gql`
  fragment RepositoriesFragment on RepositoryConnection {
    edges {
      node {
        id
        description
        forksCount
        fullName
        language
        ownerAvatarUrl
        ratingAverage
        reviewCount
        stargazersCount
      }
    }
  }
`