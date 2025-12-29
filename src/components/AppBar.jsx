import { View, StyleSheet, Pressable, Text, Alert } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: { 
    paddingTop: Constants.statusBarHeight + 10,
    paddingLeft: 10,
    paddingBottom: 10,
    display: 'flex',
    direction: 'row',
    backgroundColor: theme.backgroundColors.appBarBg,
    opacity: 0.8,
  }
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => Alert.alert('repositories page clicked')}>
        <AppBarTab tabName="Repositories" />
      </Pressable>
    </View>
  )
};

export default AppBar;