/* eslint-disable @typescript-eslint/no-explicit-any */

import { createTheme, deleteTheme, getAllThemes, updateTheme } from "@/services/theme.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";






export const useCreateTheme = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => createTheme(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["theme"] });
    },
  });
};

export const useAllThemes = () => {
  return useQuery({
    queryKey: ["theme"],
    queryFn: getAllThemes,
  });
};




export const useDeleteTheme = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteTheme(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["theme"],
      });
    },
  });
};


export const useUpdateTheme = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTheme,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["theme"],
      });
    },
  });
}; 


