import { useMutation } from "@apollo/client/react";

import { GET_USER } from "../graphql/mutations";


const useSignIn = () => {
  const [mutate, result] = useMutation(GET_USER);

  const signIn = async({ username, password}) => {
    return mutate({
      variables: {username, password}
    });
  }

  return [signIn, result]
}

export default useSignIn;