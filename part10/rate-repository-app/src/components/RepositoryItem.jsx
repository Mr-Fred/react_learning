import { View, Text, Image, StyleSheet } from 'react-native';
import theme from '../theme'; 
import Utils from '../utils'; 

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
  },
  topSection: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 4,
    marginRight: 10,
  },
  info: {
    flexShrink: 1,
  },
  fullName: {
    fontWeight: 'bold',
    fontSize: theme.fontSizes.subheading,
    marginBottom: 5,
  },
  description: {
    color: theme.colors.textSecondary,
    marginBottom: 5,
  },
  languageTag: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.primary,
    color: 'white',
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 4,
    overflow: 'hidden',
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  statItem: {
    alignItems: 'center',
  },
  statCount: {
    fontWeight: 'bold',
  },
});

const RepositoryItem = ({ item }) => (
  <View style={styles.container}>
    <View style={styles.topSection}>
      <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />
      <View style={styles.info}>
        <Text style={styles.fullName}>{item.fullName}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.languageTag}>{item.language}</Text>
      </View>
    </View>
    <View style={styles.statsSection}>
      <View style={styles.statItem}>
        <Text style={styles.statCount}>{Utils.formatThousands(item.stargazersCount)}</Text>
        <Text>Stars</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statCount}>{Utils.formatThousands(item.forksCount)}</Text>
        <Text>Forks</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statCount}>{item.reviewCount}</Text>
        <Text>Reviews</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statCount}>{item.ratingAverage}</Text>
        <Text>Rating</Text>
      </View>
    </View>
  </View>
);

export default RepositoryItem;
