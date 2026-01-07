import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client/react';

import { useMutation } from "@apollo/client/react";

import { GET_USER } from "../graphql/mutations";


const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(GET_USER);

  const signIn = async({ username, password}) => {
    const result = await mutate({
      variables: {username, password}
    });

    const { data } = result;

    if (data?.authenticate?.accessToken) {
      await authStorage.setAccessToken(data.authenticate.accessToken);
      await apolloClient.resetStore();
    }

    return result;
  }

  return [signIn, result]
}

export default useSignIn;