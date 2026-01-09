import RepositoryItem from "./RepositoryItem"
import { useParams } from "react-router-native"
import { View } from "react-native";
import Text from "./Text";

import { SINGLE_REPO } from "../graphql/queries";
import { useQuery } from "@apollo/client/react";


const SingleRepositoryView = () => {
  const params = useParams(); 
  const id = params.id;

  const {data, loading, error} = useQuery(SINGLE_REPO, {
    variables: { id },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) {
    return (
      <Text>Loading...</Text>
    )
  }

  if (error) {
    return (
      <Text>Error loading page... {error.message}</Text>
    )
  }

  const repository = data?.repository;

  return (
    <View>
      {repository ? (
        <RepositoryItem {...repository} />
      ) : (
        <Text> Repository not found</Text>
      )}
    </View>
  )

}

export default SingleRepositoryView;