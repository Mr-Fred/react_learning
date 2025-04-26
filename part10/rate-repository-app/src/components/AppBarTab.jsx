// src/components/AppBarTab.jsx
import { StyleSheet } from 'react-native';
import Text from './Text';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  tab: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    
  },
});

const AppBarTab = ({ title, to }) => {

  return (
    <Link to={to} style={styles.tab}>
      <Text color="primary" fontWeight="bold" fontSize="subheading">
        {title}
      </Text>
    </Link>
  );
};

export default AppBarTab;
