import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useParams } from "react-router-native";
import useRepositoryReviews from "../hooks/useRepositoryReviews";
import RepositoryItem from "./RepositoryItem";
import theme from "../theme";
import { format } from "date-fns";

const REVIEW_PAGE_SIZE = 1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.mainBackground || "#e1e4e8",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: theme.colors.error || "red",
    fontSize: theme.fontSizes.body || 16,
    textAlign: "center",
    padding: 10,
  },
  separator: {
    height: 10,
    backgroundColor: "#e1e4e8",
  },
  reviewContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 5,
  },
  ratingCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  ratingText: {
    color: theme.colors.primary,
    fontWeight: "bold",
    fontSize: 20,
  },
  reviewContent: {
    flex: 1,
    flexDirection: "column",
  },
  username: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  date: {
    color: theme.colors.textSecondary,
    marginBottom: 6,
  },
  reviewText: {
    fontSize: theme.fontSizes.body,
  },
});

// Shows repository info at the top
const RepositoryInfo = ({ repository }) => (
  <RepositoryItem item={repository} showGitHubButton={true} />
);

// Shows a single review
const ReviewItem = ({ review }) => (
  <View style={styles.reviewContainer}>
    <View style={styles.ratingCircle}>
      <Text style={styles.ratingText}>{review.rating}</Text>
    </View>
    <View style={styles.reviewContent}>
      <Text style={styles.username}>{review.user?.username}</Text>
      <Text style={styles.date}>
        {format(new Date(review.createdAt), "d.M.yyyy")}
      </Text>
      <Text style={styles.reviewText}>{review.text}</Text>
    </View>
  </View>
);

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepositoryView = () => {
  const { repositoryId } = useParams();

  const { reviews, loading, error, fetchMore, repository } =
    useRepositoryReviews(repositoryId, { first: REVIEW_PAGE_SIZE });

  if (loading && !repository) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator testID="ActivityIndicator" size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <Text style={styles.errorText}>
        Error loading repository: {error.message}
      </Text>
    );
  }

  if (!repository) {
    return <Text style={styles.errorText}>Repository not found.</Text>;
  }

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      ItemSeparatorComponent={ItemSeparator}
      contentContainerStyle={{ paddingBottom: 20 }}
      onEndReached={fetchMore}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepositoryView;
