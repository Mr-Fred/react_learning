import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCreators } from "../services/creators";
import { useDispatch } from "react-redux";
import { useShowNotification } from "../reducers/notifReducers";


export const useFetchCreators = () => {
  const qC = useQueryClient();
  const dispatch = useDispatch();
  return useQuery({
    queryKey: ["creators"],
    queryFn: async () => {
      return await fetchCreators();
    },
    refetchOnWindowFocus: false,
    retry: 1,
    onError: (err) => {
      dispatch(useShowNotification(
        `Error fetching creators: ${err.message}`,
        "error",
        5
      ));
    },
  });
};