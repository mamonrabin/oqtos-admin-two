/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "sonner";

export const mutationToast = {
  onSuccess: (res: any) => {
    toast.success(res?.message || "Updated successfully");
  },
  onError: (error: any) => {
    toast.error(
      error?.response?.data?.message || "Something went wrong."
    );
  },
};