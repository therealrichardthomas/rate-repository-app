import Text from "./Text"
import theme from "../theme";
import { StyleSheet, FlatList, View } from "react-native";
import { format } from "date-fns";

import { useQuery } from "@apollo/client/react";
import { CURRENT_USER } from "../graphql/queries";

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
  console.log(review);
  const date = format(new Date(review.createdAt), "MM.dd.yyyy");
  
  return (
    <View style={styles.container}>
      <View style={styles.rating}>
        <Text fontWeight="bold" style={styles.ratingText}>
          {review.rating}
        </Text>
      </View>
      <View>
        <Text fontWeight="bold" style={{marginBottom: 5}}>{review.repository.fullName}</Text>
        <Text color="textSecondary" style={{marginBottom: 5}}>{date}</Text>
        <Text>{review.text}</Text>
      </View>

    </View>
  )
}

const renderItem = ({item}) => {
  // console.log(item);
  return <ReviewItem review={item} />
};

const MyReviews = () => {
  const { data, loading } = useQuery(CURRENT_USER, {
    variables: { includeReviews: true }
  });

  if (loading) {
    return <Text>Loading...</Text>
  }

  console.log(data);

  const reviewNodes = data?.me?.reviews ? data.me.reviews.edges.map(edge => edge.node) : [];

  return (
    <FlatList 
      data={reviewNodes}
      renderItem={renderItem}
      keyExtractor={(item, index) => index}
    />
  );
};


export default MyReviews;