import { useQuery } from '@apollo/client/react'

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (orderBy, orderDirection, searchKeyword) => {
  const {data, loading, refetch} = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: { orderBy, orderDirection, searchKeyword }
  });

  const repositories = data ? data.repositories : undefined;

  return { repositories, loading, refetch};
};

export default useRepositories;