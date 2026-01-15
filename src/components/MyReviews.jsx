import Text from "./Text"
import theme from "../theme";
import { StyleSheet, FlatList, View, Pressable, Alert } from "react-native";
import { format } from "date-fns";
import { useNavigate } from "react-router-native";

import { useQuery, useMutation } from "@apollo/client/react";
import { CURRENT_USER } from "../graphql/queries";
import { DELETE_REVIEW } from "../graphql/mutations";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.backgroundColors.repoItemBg,
    minHeight: 140,
    marginTop: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  topContainer: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  rating: {
    borderWidth: 2,
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
  button: {
    backgroundColor: theme.backgroundColors.tagBg,
    borderRadius: 5,
    margin: 10,
    padding: 15,
    flexDirection: 'row', 
    justifyContent: 'center',
    width: '45%',
  },
  buttonDelete: {
    backgroundColor: '#d7384c',
    borderRadius: 5,
    margin: 10,
    padding: 15,
    flexDirection: 'row', 
    justifyContent: 'center',
    width: '45%',
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
  }
});

const ReviewItem = ({ review, refetch }) => {
  console.log(review);
  const date = format(new Date(review.createdAt), "MM.dd.yyyy");
  const navigate = useNavigate();
  const [deleteReview] = useMutation(DELETE_REVIEW);

  const deleteAlert = async () => {
    Alert.alert('Delete review', "Are you sure you want to delete this review?", [
      {
        text: 'Cancel',
        onPress: () => console.log("Cancel pressed"),
        style: 'cancel'
      },
      {
        text: 'Delete',
        onPress: handleDelete,
        style: "destructive"
      }
    ])
  }

  const handleDelete = async () => {
    try {
      await deleteReview({
        variables: { id: review.id }
      });

      refetch();

    } catch (e) {
      console.log("ERROR DELETING REVIEW: ", e);
    }
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.rating}>
          <Text fontWeight="bold" style={styles.ratingText}>
            {review.rating}
          </Text>
        </View>
        <View style={{flex: 1}}>
          <Text fontWeight="bold" style={{marginBottom: 5}}>{review.repository.fullName}</Text>
          <Text color="textSecondary" style={{marginBottom: 5}}>{date}</Text>
          <Text>{review.text}</Text>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <Pressable style={styles.button} onPress={() => navigate(`/repository/${review.repository.id}`)}>
          <Text fontWeight="bold" style={{color: 'white'}}>View Repository</Text>
        </Pressable>
        <Pressable style={styles.buttonDelete} onPress={deleteAlert}>
          <Text fontWeight="bold" style={{color: 'white'}}>Delete review</Text>
        </Pressable>
      </View>
    </View>

  )
}

const MyReviews = () => {
  const { data, loading, refetch } = useQuery(CURRENT_USER, {
    variables: { includeReviews: true }
  });

  if (loading) {
    return <Text>Loading...</Text>
  }

  const reviewNodes = data?.me?.reviews ? data.me.reviews.edges.map(edge => edge.node) : [];

  return (
    <FlatList 
      data={reviewNodes}
      renderItem={({item}) => <ReviewItem review={item} refetch={refetch}/>}
      keyExtractor={(item, index) => index}
    />
  );
};


export default MyReviews;