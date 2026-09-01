import { getAllCustomeDesign, updateCustomeDesign } from "@/services/customeDesign.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useAllCustomeDesign = () => {
  return useQuery({
    queryKey: ["customeDesign"],
    queryFn: getAllCustomeDesign,
  });
};

export const useUpdateCustomeDesign = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCustomeDesign,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["customeDesign"],
      });
    },
  });
};