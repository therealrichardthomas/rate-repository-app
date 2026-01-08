import { View, Image, StyleSheet} from "react-native";
import theme from "../theme";
import Text from "./Text";
import RepoMetric from "./RepoMetric";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.backgroundColors.repoItemBg,
  },
  imageStyle: {
    width: 50, 
    height: 50,
    borderRadius: 5,
    marginRight: 15,
  },
  topContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
  },
  rightTopContainer: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  tagContainer: {
    backgroundColor: theme.backgroundColors.tagBg,
    alignSelf: 'flex-start',
    overflow: 'hidden',
    padding: 5,
    borderRadius: 5,
  },
  tagText: {
    color: 'white',
  },
  bottomContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  }
})


const RepositoryItem = props => {
  return (
    <View testID="repositoryItem" style={styles.container}> 
      <View style={styles.topContainer}>
        <Image source={{uri: props.ownerAvatarUrl}} style={styles.imageStyle}/>
        <View style={styles.rightTopContainer}>
          <Text fontSize="subheading" fontWeight="bold" style={{ marginBottom: 5 }}>{props.fullName}</Text>
          <Text fontSize="subheading" color="textSecondary" style={{ marginBottom: 5 }}>{props.description}</Text>
          <View style={styles.tagContainer}>
            <Text style={styles.tagText}>{props.language}</Text>
          </View>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <RepoMetric metric="Stars" value={props.stargazersCount} />
        <RepoMetric metric="Forks" value={props.forksCount} />
        <RepoMetric metric="Reviews" value={props.reviewCount} />
        <RepoMetric metric="Rating" value={props.ratingAverage} />
      </View>
    </View>
  )
}


export default RepositoryItem;