import { View, Image, StyleSheet, Pressable} from "react-native";
import theme from "../theme";
import Text from "./Text";
import RepoMetric from "./RepoMetric";
import { useNavigate } from "react-router-native";
import * as Linking from 'expo-linking';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.backgroundColors.repoItemBg,
    padding: 10,
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
  },
  button: {
    backgroundColor: theme.backgroundColors.tagBg,
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: '5px'
  }
})


const RepositoryItem = props => {
  const navigate = useNavigate();

  const singleRepoView = () => {
    navigate(`/repository/${props.id}`);
  };

  const openInGitHub = () => {
    Linking.openURL(props.url);
  };

  return (
    <View testID="repositoryItem" style={styles.container}> 
      <Pressable onPress={singleRepoView}>
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
      </Pressable>
      {props.url ? (
        <Pressable onPress={openInGitHub} style={styles.button}>
          <Text fontWeight='bold' style={[styles.buttonText, { color: 'white' }]}>Open in GitHub</Text>
        </Pressable>
      ) : null}
    </View>
  )
}


export default RepositoryItem;