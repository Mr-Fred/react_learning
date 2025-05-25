import React from 'react';
import { View, Text, FlatList, StyleSheet, Pressable, Alert } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useMutation } from '@apollo/client';
import useReviews from '../hooks/useReviews';
import { format } from 'date-fns';
import { DELETE_REVIEW } from '../graphQl/mutations';

const styles = StyleSheet.create({
  reviewContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  repoName: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  rating: {
    color: '#0366d6',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 4,
  },
  date: {
    color: '#586069',
    marginBottom: 6,
  },
  reviewText: {
    fontSize: 16,
    marginBottom: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  actionButton: {
    flex: 1,
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  viewButton: {
    backgroundColor: '#0366d6',
  },
  deleteButton: {
    backgroundColor: '#d73a4a',
  },
  actionText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

const ReviewItem = ({ review, onViewRepository, onDelete }) => (
  <View style={styles.reviewContainer}>
    <Text style={styles.repoName}>{review.repository.fullName}</Text>
    <Text style={styles.rating}>Rating: {review.rating}</Text>
    <Text style={styles.date}>{format(new Date(review.createdAt), 'd.MM.yyyy')}</Text>
    <Text style={styles.reviewText}>{review.text}</Text>
    <View style={styles.actions}>
      <Pressable
        style={[styles.actionButton, styles.viewButton]}
        onPress={() => onViewRepository(review.repository.id)}
      >
        <Text style={styles.actionText}>View repository</Text>
      </Pressable>
      <Pressable
        style={[styles.actionButton, styles.deleteButton]}
        onPress={() => onDelete(review.id)}
      >
        <Text style={styles.actionText}>Delete review</Text>
      </Pressable>
    </View>
  </View>
);

const MyReviews = () => {
  const { reviews, loading, error, refetch } = useReviews(true);
  const navigate = useNavigate();
  const [deleteReview] = useMutation(DELETE_REVIEW);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const handleViewRepository = (repositoryId) => {
    navigate(`/repository/${repositoryId}`);
  };

  const handleDelete = (reviewId) => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteReview({ variables: { id: reviewId } });
              refetch();
            } catch (e) {
              // Optionally show error
            }
          },
        },
      ]
    );
  };

  return (
    <View>
      <FlatList
        data={reviews}
        renderItem={({ item }) => (
          <ReviewItem
            review={item}
            onViewRepository={handleViewRepository}
            onDelete={handleDelete}
          />
        )}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text>No reviews found.</Text>}
        contentContainerStyle={{ paddingVertical: 10, backgroundColor: '#e1e4e8', flexGrow: 1 }}
      />
    </View>
  );
};

export default MyReviews;
