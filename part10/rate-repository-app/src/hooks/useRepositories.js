import { useState, useEffect } from "react";

const useRepositories = () => {
  const [repositories, setRepositories] = useState();
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);

  const fetchRepositories = async () => {
    setLoading(true);

    // eslint-disable-next-line no-undef
    const response = await fetch('http://192.168.0.104:5000/api/repositories');
    const jsonData = await response.json();

    setLoading(false);
    setRepositories(jsonData);
  };
  useEffect(() => {
    fetchRepositories();
  }, []);
  return { repositories, loading, refetch: fetchRepositories };
};

export default useRepositories;