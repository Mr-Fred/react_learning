import { FlatList, View, StyleSheet } from 'react-native';
import repositories from '../data/repositories';
import RepositoryItem from './RepositoryItem';

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
  return (
    <FlatList
      data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem item={item} styles={styles.container} />}
      keyExtractor={(item) => item.id}
    />
  );
};

export default RepositoryList;