import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphQl/queries';

const useRepositoryReviews = (repositoryId, variables = {}) => {
  const { data, loading, error, fetchMore } = useQuery(GET_REPOSITORY, {
    variables: { id: repositoryId, ...variables },
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
  });

  const reviews = data?.repository?.reviews;
  const reviewNodes = reviews?.edges ? reviews.edges.map(edge => edge.node) : [];
  const pageInfo = reviews?.pageInfo;

  const handleFetchMore = () => {
    if (!loading && pageInfo?.hasNextPage) {
      fetchMore({
        variables: {
          id: repositoryId,
          after: pageInfo.endCursor,
          ...variables,
        },
      });
    }
  };

  return {
    reviews: reviewNodes,
    loading,
    error,
    fetchMore: handleFetchMore,
    pageInfo,
    repository: data?.repository,
  };
};

export default useRepositoryReviews;
