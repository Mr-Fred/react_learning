import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import Constant from 'expo-constants';
import { setContext } from '@apollo/client/link/context';


const apolloUri = Constant.expoConfig.extra.apolloUri;

const httpLink = createHttpLink({
  uri: apolloUri,
});

const createApolloClient = (authStorage) => {
  const authLink = setContext(async (_, { headers }) => {
    try {
      const accessToken = await authStorage.getAccessToken();
      // eslint-disable-next-line no-undef
      console.log('Access token:', accessToken);
      return {
        headers: {
          ...headers,
          authorization: accessToken ? `Bearer ${accessToken}` : '',
        },
      };
    } catch (error) {
      // eslint-disable-next-line no-undef
      console.error('Error getting access token:', error);
      return {
        headers,
      };
    }
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;