import {
  deleteOrder,
  getAllOrders,
  getOrders,
  getTodayOrderLength,
  getTodayOrders,
  orderFilter,
  updateOrder,
} from "@/services/order.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useOrders = () => {
  return useQuery({
    queryKey: ["all-orders"],
    queryFn: getOrders,
  });
};


export const useAllOrders = ({
  page = 1,
  limit = 10,
  paymentMethod,
  paymentStatus,
  status,
  dateFilter,
}: orderFilter) => {
  return useQuery({
    queryKey: [
      "orders",
      page,
      limit,
      paymentMethod,
      paymentStatus,
      status,
      dateFilter,
    ],
    queryFn: () =>
      getAllOrders({
        page,
        limit,
        paymentMethod,
        paymentStatus,
        status,
        dateFilter,
      }),
    placeholderData: (previousData) => previousData,
  });
};

export const useTodayOrders = ({ page = 1, limit = 10 }: orderFilter) => {
  return useQuery({
    queryKey: ["orders", page, limit],
    queryFn: () => getTodayOrders({ page, limit }),
    placeholderData: (previousData) => previousData,
  });
};


export const useTodayOrderLength = () => {
  return useQuery({
    queryKey: ["all-orders"],
    queryFn: getTodayOrderLength,
  });
};

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteOrder(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateOrder,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });
};
