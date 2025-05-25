import React from "react";
import { FlatList, View, StyleSheet, TextInput } from "react-native";
import RepositoryItem from "./RepositoryItem";
import { Picker } from "@react-native-picker/picker";
import {orderOptions} from "../constants/constants"

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: "#e1e4e8",
  },
  container: {
    flexGrow: 1,
    flexShrink: 1,
    padding: 10,
  },
  pickerContainer: {
    backgroundColor: "white",
    padding: 10,
    marginBottom: 5,
  },
  searchContainer: {
    backgroundColor: "white",
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
  },
  searchInput: {
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListHeader = ({
  selectedOrder,
  setSelectedOrder,
  searchKeyword,
  setSearchKeyword,
}) => (
  <View>
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        value={searchKeyword}
        onChangeText={setSearchKeyword}
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="while-editing"
      />
    </View>
    <View style={styles.pickerContainer}>
      <Picker
        selectedValue={JSON.stringify(selectedOrder)}
        onValueChange={(itemValue) => setSelectedOrder(JSON.parse(itemValue))}
        mode="dropdown"
      >
        {orderOptions.map((option) => (
          <Picker.Item
            key={option.label}
            label={option.label}
            value={JSON.stringify(option.value)}
          />
        ))}
      </Picker>
    </View>
  </View>
);


class RepositoryListContainer extends React.Component {

  renderHeader = () => {
    const { selectedOrder, setSelectedOrder, searchKeyword, setSearchKeyword } =
      this.props;
    return (
      <RepositoryListHeader
        selectedOrder={selectedOrder}
        setSelectedOrder={setSelectedOrder}
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
      />
    );
  };

  render() {
    const { onEndReach, repositories, onOpenButtonPress } = this.props;
    return (
      <FlatList
        data={repositories}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
          <RepositoryItem
            item={item}
            styles={styles.container}
            onPress={() => onOpenButtonPress(item.id)}
          />
        )}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={this.renderHeader}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

export default RepositoryListContainer;