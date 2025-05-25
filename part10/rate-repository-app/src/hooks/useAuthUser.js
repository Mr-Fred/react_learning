import { useApolloClient, useQuery } from "@apollo/client";
import { GET_AUTHORIZED_USER } from "../graphQl/queries";
import useAuthStorage from "./useAuthStorage";

const useAuthUser = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const { loading, error, data } = useQuery(GET_AUTHORIZED_USER);

  const signOut = async () => {
    
    await authStorage.removeAccessToken();   // Step 1: Remove token
    await apolloClient.resetStore();         // Step 2: Clear and refetch queries
  };

  return {
    user: data?.me,
    loading,
    error,
    signOut,
  };
};

export default useAuthUser;
