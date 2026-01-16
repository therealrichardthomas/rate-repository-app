import RepositoryItem from "./RepositoryItem"
import { useParams } from "react-router-native"
import { View, StyleSheet, FlatList } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { format } from "date-fns";

import { SINGLE_REPO } from "../graphql/queries";
import { useQuery } from "@apollo/client/react";



const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.backgroundColors.repoItemBg,
    padding: 10,
    paddingRight: 55,
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    minHeight: 140,
  },
  rating: {
    borderWidth: '2px',
    width: 40,
    height: 40,
    borderRadius: 25,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#4578b6',
    marginRight: 10,
  },
  ratingText: {
    color: '#4578b6',
  },
})

const ReviewItem = ({ review }) => {
  const date = format(new Date(review.createdAt), "MM.dd.yyyy");
  
  return (
    <View style={styles.container}>
      <View style={styles.rating}>
        <Text fontWeight="bold" style={styles.ratingText}>
          {review.rating}
        </Text>
      </View>
      <View>
        <Text fontWeight="bold" style={{marginBottom: 5}}>{review.user.username}</Text>
        <Text color="textSecondary" style={{marginBottom: 5}}>{date}</Text>
        <Text>{review.text}</Text>
      </View>

    </View>
  )
}

const SingleRepositoryView = () => {
  const params = useParams(); 
  const id = params.id;
  
  const variables = { 
    id,
    first: 2
  }

  const {data, loading, error, fetchMore} = useQuery(SINGLE_REPO, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      }
    })
  }

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
  const reviewNodes = repository ? repository.reviews.edges.map(edge => edge.node) : [];

  const renderItem = ({item}) => (<ReviewItem review={item} />);

  const onEndReach = () => {
    handleFetchMore();
  }

  return (
    <FlatList 
      data={reviewNodes}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      ListHeaderComponent={() => (repository ? <RepositoryItem {...repository} /> : null)}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  )

}

export default SingleRepositoryView;