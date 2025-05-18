import { useMutation } from "@apollo/client";
import { AUTHENTICATE } from "../graphQl/mutations";
import useAuthStorage from "./useAuthStorage";
import { useApolloClient } from "@apollo/client";
import { useNavigate } from "react-router-native";

// Custom hook to handle sign-in functionality
// It uses Apollo Client for GraphQL mutations and AuthStorage for token management
const useSignIn = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const navigate = useNavigate();


  const [mutate, result] = useMutation(AUTHENTICATE, {
    fetchPolicy: "no-cache",
  });

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({
      variables: {
        credentials: {
          username,
          password,
        },
      },
    });

    try {
      const { accessToken } = data.authenticate;
      if (accessToken) {
        await authStorage.setAccessToken(accessToken);
        await apolloClient.resetStore();
        navigate("/");
      }
    } catch (error) {
      // eslint-disable-next-line no-undef
      console.error('Error setting access token:', error);
    }

    return data;
  };

  return [signIn, result];
};

export default useSignIn;