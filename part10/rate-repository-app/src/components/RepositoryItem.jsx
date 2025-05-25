import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import * as Linking from 'expo-linking';
import theme from '../theme'; 
import Utils from '../utils/utils'; 

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
  githubButton: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: 5,
    marginTop: 15,
    alignItems: 'center',
  },
  githubButtonText: {
    color: 'white',
    fontWeight: theme.fontWeights.bold,
  },
});

const RepositoryItem = ({ item, onPress, showGitHubButton = false }) => {
  if (!item) {
    return null;
  };

  const handleOpenGitHub = () => {
    Linking.openURL(item.url);
  };

  return(
    <View testID="repositoryItem" style={styles.container}>
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
    {showGitHubButton && item.url ?
      (
        <Pressable onPress={handleOpenGitHub} style={styles.githubButton} testID="openInGitHubButton">
          <View style={styles.githubButton}>
            <Text style={styles.githubButtonText}>Open in GitHub</Text>
          </View>
        </Pressable>
      ) : onPress ? ( // If onPress is provided and not showing GitHub button, shwow open repository button
        <Pressable onPress={onPress} testID={`repositoryItemPressable-${item.id}`}>
          <View style={styles.githubButton}>
            <Text style={styles.githubButtonText}>Open Repository</Text>
          </View>
        </Pressable>
      ) : null
    }
  </View>
  )
};

export default RepositoryItem;
