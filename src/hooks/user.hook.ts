/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteUser, getAllAffiliateUsers, getAllStaffs, getAllUsers, updateUser } from "@/services/user.api";

export const useAllUsers = (
  page: number,
  limit: number,
  dateFilter: string,
) => {
  return useQuery({
    queryKey: ["users", page, limit, dateFilter],
    queryFn: () => getAllUsers(page, limit, dateFilter),
    placeholderData: (previousData) => previousData,
  });
};
export const useAllAffiliateUsers = (
  page: number,
  limit: number,
  dateFilter: string,
) => {
  return useQuery({
    queryKey: ["users", page, limit, dateFilter],
    queryFn: () => getAllAffiliateUsers(page, limit, dateFilter),
    placeholderData: (previousData) => previousData,
  });
};

export const useAllStaffs = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getAllStaffs,
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteUser(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
};
