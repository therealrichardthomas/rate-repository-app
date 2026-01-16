import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';
import { Link } from 'react-router-native';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-native';

import { useQuery } from '@apollo/client/react';
import { CURRENT_USER } from '../graphql/queries';
import useSignOut from '../hooks/useSignOut';


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
  const navigate = useNavigate();
  const signOut = useSignOut();
  const { data } = useQuery(CURRENT_USER, {
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (!data?.me) {
      navigate('/', { replace: true });
    }
  }, [data?.me])
  
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/" style={styles.tab}>
          <AppBarTab tabName="Repositories" />
        </Link>
        {data?.me ? (
          <Link to="/reviewform" style={styles.tab}>
            <AppBarTab tabName="Create a review" />
          </Link>
        ) : null}
        {data?.me ? (
          <Link to="/myreviews" style={styles.tab}>
            <AppBarTab tabName="My Reviews" />
          </Link>
        ) : null}
        {data?.me ? (
          <Pressable onPress={signOut}>
            <AppBarTab tabName="Sign Out" />
          </Pressable>
        ) : (
          <Link to="/signin" style={styles.tab}>
            <AppBarTab tabName="Sign In" />
          </Link>
        )}
        {data?.me ? (
          null
        ) : (
          <Link to="/signup">
            <AppBarTab tabName="Sign up" />
          </Link>
        )}
      </ScrollView>
    </View>
  )
};

export default AppBar;