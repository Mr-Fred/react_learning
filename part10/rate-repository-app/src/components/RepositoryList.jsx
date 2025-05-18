import { FlatList, View, StyleSheet, Text } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphQl/queries';
// import useRepositories from '../hooks/useRepositories';


const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: '#e1e4e8',
  },
  container: {
    flexGrow: 1,
    flexShrink: 1,
    padding: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  // const { repositories } = useRepositories();
  const { data, loading, error } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;
  if (!data || !data.repositories) return null;
  const repositoryNodes = data?.repositories?.edges?.map(
    edge => edge.node
  ) || [];
    
  // if (!repositories) return null;
  // const repositoryNodes = repositories.edges.map(edge => edge.node);
  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem item={item} styles={styles.container} />}
      keyExtractor={(item) => item.id}
    />
  );
};

export default RepositoryList;