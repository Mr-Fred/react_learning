// use react-query to fetch comments
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchComments, addComment, deleteComment, updateComment } from "../services/comments";


export const useFetchComments = (id, token) => {
  return useQuery({
    queryKey: ["comments", id],
    queryFn: async () => {
      return await fetchComments(id, token);
    },
    refetchOnWindowFocus: false,
    retry: 1,
  });
}

export const useAddComment = () => {
  const qC = useQueryClient();
  return useMutation({
    mutationFn: ({id, token, comment}) => {
      return addComment(id, token, comment);
    },
    onSuccess: async (comment) => {
      qC.setQueryData(["comments", comment.blog], (oldComments) => [...oldComments, comment]);
    },
    onError: (err) => {
      console.log(err);
    },
  });
};

export const useDeleteComment = () => {
  const qC = useQueryClient();
  return useMutation({
    mutationFn: ({id, commentId, token}) => {
      return deleteComment(id, commentId, token);
    },
    onSuccess: async (comment) => {
      const previousComments = qC.getQueryData(["comments", comment.blog]);
      qC.setQueryData(["comments", comment.blog], () =>{
        return previousComments.filter((c) => c.id !== comment.id);
      });
    },
    onError: (err) => {
      console.log(err);
    },
  });
};

export const useUpdateComment = () => {
  const qC = useQueryClient();
  return useMutation({
    mutationFn: ({id:id, comment: comment, token: token}) => {
      return updateComment(id, comment, token);
    },
    onSuccess: async (comment) => {
      const previousComments = qC.getQueryData(["comments", comment.blog]);
      qC.setQueryData(["comments", comment.blog], () => {
        return previousComments.map((c) => (c.id === comment.id ? comment : c))
      });
    },
    onError: (err) => {
      console.log(err);
    },
  });
};
