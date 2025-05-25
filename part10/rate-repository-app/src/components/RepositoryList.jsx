import { useState } from "react";
import { Text } from "react-native";
import { useNavigate } from "react-router-native";
import { useDebounce } from "use-debounce";
import useRepositoriesGraphql from "../hooks/useRepositoriesGraphql";
import RepositoryListContainer from "./RepositoryListContainer";
import { orderOptions } from "../constants/constants";

const RepositoryList = () => {
  const [selectedOrder, setSelectedOrder] = useState(orderOptions[0].value);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);

  const navigate = useNavigate();

  const { repositories, loading, error, fetchMore } = useRepositoriesGraphql({
    first: 5,
    ...selectedOrder,
    searchKeyword: debouncedSearchKeyword,
  });

  // Safely extract nodes only if repositories and repositories.edges exist
  const repositoriesNode =
    repositories && repositories.edges
      ? repositories.edges.map((edge) => edge.node)
      : [];

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;
  if (!repositories || !repositories.edges) return null;

  const handleOpenButtonPress = (id) => {
    navigate(`/repository/${id}`);
  };

  const onEndReach = () => {
    console.log("End reached, fetching more...");
    fetchMore();
  };

  return (
    <RepositoryListContainer
      repositories={repositoriesNode}
      onOpenButtonPress={handleOpenButtonPress}
      selectedOrder={selectedOrder}
      setSelectedOrder={setSelectedOrder}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryList;
