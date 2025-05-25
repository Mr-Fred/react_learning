import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';

import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import SingleRepositoryView from './SingleRepositoryView';
import CreateReview from "./CreateReview";
import SignUp from "./SignUp";
import MyReviews from "./MyReviews";
// import SignOut from "./SignOut";

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
    padding: 10,
  },
});

const Main = () => {
  return (
    <View>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route
          path="/repository/:repositoryId"
          element={<SingleRepositoryView />}
        />
        {/* Add a route for the SignIn component */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/createreview" element={<CreateReview />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/myreviews" element={<MyReviews />} />
        {/* <Route path="/signout" element={<SignOut />} /> */}
        {/* Add other routes here */}
        {/* Redirect any unknown routes to the home page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;