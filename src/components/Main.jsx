import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';

import RepositoryList from './RepositoryList';
import SingleRepositoryView from './SingleRepositoryView';
import AppBar from './AppBar';
import SignIn from './SignIn';
import SignUp from './SignUp';
import ReviewForm from './ReviewForm'
import MyReviews from './MyReviews';

import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.backgroundColors.mainBg,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/repository/:id" element={<SingleRepositoryView />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reviewform" element={<ReviewForm />} />
        <Route path="/myreviews" element={<MyReviews />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;