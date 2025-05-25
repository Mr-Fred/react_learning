import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphQl/queries';

const useRepositoriesGraphql = (variables) => {
  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    variables,
    fetchPolicy: 'cache-and-network',
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  // Flatten edges to nodes if data exists
  const repositories = data?.repositories
    ? data.repositories
    : [];

  return { 
    repositories,
    loading, 
    fetchMore: handleFetchMore, 
    ...result
  };
};

export default useRepositoriesGraphql;
