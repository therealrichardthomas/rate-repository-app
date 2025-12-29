import { Text, StyleSheet } from 'react-native';
import theme from '../theme';


const styles = StyleSheet.create({
  text: {
    color: theme.colors.barText,
    fontSize: theme.fontSizes.bar,
    fontWeight: theme.fontWeights.bold,
  }
})

const AppBarTab = ({tabName}) => {
  return (
    <Text style={styles.text}>{tabName}</Text>
  );
};


export default AppBarTab;