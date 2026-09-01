import { createBlog, deleteBlog, getAllBlogs, updateBlog, updateBlogStatus } from "@/services/blog.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => createBlog(formData),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["blog"],
      });
    },
  });
};


export const useAllBlogs = () => {
  return useQuery({
    queryKey: ["blog"],
    queryFn: getAllBlogs,
  });
};


export const useUpdateBlogStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateBlogStatus,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["blog"],
      });
    },
  });
}; 



export const useUpdateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateBlog,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["blog"],
      });
    },
  });
}; 




export const useDeleteBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteBlog(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["blog"],
      });
    },
  });
};

