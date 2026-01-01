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