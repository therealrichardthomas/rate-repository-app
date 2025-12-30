import { View, StyleSheet, Pressable, Text, Alert, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  container: { 
    paddingTop: Constants.statusBarHeight + 10,
    paddingLeft: 10,
    paddingBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: theme.backgroundColors.appBarBg,
    opacity: 0.8,
  },
  tab: {
    marginRight: 10,
  }
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/" style={styles.tab}>
          <AppBarTab tabName="Repositories" />
        </Link>
        <Link to="/signin" style={styles.tab}>
          <AppBarTab tabName="Sign In" />
        </Link>
      </ScrollView>
    </View>
  )
};

export default AppBar;