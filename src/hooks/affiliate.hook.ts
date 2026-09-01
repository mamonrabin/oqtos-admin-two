/* eslint-disable @typescript-eslint/no-explicit-any */

import { deleteAbout, getAllAbouts, updateAbout } from "@/services/about.api";
import { createAffiliate, deleteAffiliate, getAllAffiliate, updateAffiliate } from "@/services/affiliate.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";





export const useCreateAffiliate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => createAffiliate(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["affiliate"] });
    },
  });
};

export const useAllAffiliate = () => {
  return useQuery({
    queryKey: ["affiliate"],
    queryFn: getAllAffiliate,
  });
};




export const useDeleteAffiliate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteAffiliate(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["affiliate"],
      });
    },
  });
};


export const useUpdateAffiliate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAffiliate,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["affiliate"],
      });
    },
  });
}; 


