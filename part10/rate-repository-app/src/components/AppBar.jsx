// src/components/AppBar.jsx
import { View, StyleSheet, ScrollView, Pressable, Text } from "react-native";
import Constants from "expo-constants";
import AppBarTab from "./AppBarTab";
import theme from "../theme";
import { useNavigate } from "react-router-native";
import useAuthUser from "../hooks/useAuthUser";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: theme.colors.appBarBackground,
    flexDirection: "row",
  },
  pressableText: {
    color: "white",
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontSize: 16,
  },
});

const AppBar = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuthUser();

  const handleSignOut = async () => {
    await signOut(); // Call the signOut function from useAuthUserStorage

    // Logic to sign out the user
    console.log("User signed out");

    // Navigate to the sign-in page or home page after signing out
    navigate("/signin");
    
  };
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {!user ? (
          <>
            <AppBarTab title={"Sign In"} to="/signin" />
            <AppBarTab title={"Sign up"} to="/signup" />
          </>
        ) : (
          <>
            <AppBarTab title="Repositories" to="/" />
            <AppBarTab title="My reviews" to="/myreviews" />
            <AppBarTab title={"Create a review"} to="/createreview" />
            <Pressable onPress={handleSignOut}>
              <Text style={styles.pressableText}>Sign out</Text>
            </Pressable>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
