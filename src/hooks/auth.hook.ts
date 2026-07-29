/* eslint-disable @typescript-eslint/no-explicit-any */


import { getSupperAdmin, singIn, singOut } from "@/services/auth.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useSingIn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => singIn(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["supperAdmin"] });
    },
  });
};
export const useSingOut = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: singOut,

    onSuccess: (res) => {
      // Clear all cached queries
      queryClient.clear();

      toast.success(res?.message || "Logout successful");

      // Redirect to login
      router.replace("/");
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to logout"
      );
    },
  });
};

export const useSupperAdmin = () => {
  return useQuery({
    queryKey: ["supperAdmin"],
    queryFn: getSupperAdmin,
  });
};

// export const useDeleteAbout = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (id: string) => deleteAbout(id),

//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: ["about"],
//       });
//     },
//   });
// };

// export const useUpdateAbout = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: updateAbout,

//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: ["about"],
//       });
//     },
//   });
// };
