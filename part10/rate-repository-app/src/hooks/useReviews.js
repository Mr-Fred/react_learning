import { useQuery } from '@apollo/client';
import { GET_AUTHORIZED_USER } from '../graphQl/queries';

const useReviews = (includeReviews = false) => {
  const { data, loading, error, refetch } = useQuery(GET_AUTHORIZED_USER, {
    variables: { includeReviews },
    fetchPolicy: 'cache-and-network',
  });

  // Flatten edges to nodes if data exists
  const reviews = data?.me?.reviews
    ? data.me.reviews.edges.map(edge => edge.node)
    : [];

  return { reviews, loading, error, refetch };
};

export default useReviews;
