import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client/react';

// import { useMutation } from "@apollo/client/react";

// import { AUTHENTICATE } from "../graphql/mutations";


const useSignOut = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  }

  return signOut;
}

export default useSignOut;