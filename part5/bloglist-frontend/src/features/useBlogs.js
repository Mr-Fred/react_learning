import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAll, create, update, remove } from "../services/blogs";
import { useShowNotification } from "../reducers/notifReducers";
import {useDispatch} from "react-redux";

// qC is the queryClient
// uB is the updated blog
// pB is the previous blogs
// nB is the new blog
// oB is the old blogs

export const useFetchBlogs = (token) => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      return await getAll(token);
    },
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

export const useCreateBlog = () => {
  const qC = useQueryClient();
  const dispatch = useDispatch()
  return useMutation({
    mutationFn: ({nB, token}) => {
      return create(nB, token);
    },
    onSuccess: async (nB) => {
      qC.setQueryData(["blogs"], (ob) => [...ob, nB]);
      dispatch(useShowNotification("Blog created", "success", 5))
    },
    onError: (err) => {
      dispatch(useShowNotification(
        `Blog could not be created. Error: ${err.response.data.error}`,
        "error",
        5
      ));
    },
  });
};

export const useUpdateBlog = () => {
  const qC = useQueryClient();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: ({uB: uB, token: token}) => {
      return update(uB, token);
    },
    onSuccess: async (data) => {
      const pB = qC.getQueryData(["blogs"]);
      qC.setQueryData(["blogs" ], () => {
        return pB.map((b) => (b.id === data.id ? data : b));
      })
      dispatch(useShowNotification("Blog updated", "success", 5));
    },
    onError: (err) => {
      dispatch(useShowNotification(
        `Blog could not be updated. Error: ${err.response.data.error}`,
        "error",
        5
      ));
    },
  });
};

export const useDeleteBlog = () => {
  const qC = useQueryClient();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: ({id: id, token: token}) => remove(id, token),
    onSuccess: async (data) => {
      const pB = qC.getQueryData(["blogs"]);
      qC.setQueryData(["blogs"], () => {
        return pB.filter((b) => b.id !== data.id);
      });
      dispatch(useShowNotification("Blog deleted", "success", 5));
    },
    onError: (err) => {
      dispatch(useShowNotification(
        `Blog could not be deleted. Error: ${err.response.data.error}`,
        "error",
        5
      ));
    },
  });
};
