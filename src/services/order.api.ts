import { AxiosInstance } from "../lib/AxiosInstance";

export const getOrders = async () => {
  const { data } = await AxiosInstance.get("/order");

  return data;
};

export type orderFilter = {
  page?: number;
  limit?: number;
  category?: string;
  subCategory?: string;
  brand?: string;
  dateFilter?: string;
  paymentMethod?: string;
  paymentStatus?: string;
  status?: string;
};

// export const getOrders = async (filters: orderFilter) => {
//   const params = new URLSearchParams();

//   Object.entries(filters).forEach(([key, value]) => {
//     if (value) params.append(key, String(value));
//   });

//   const { data } = await AxiosInstance.get(`/order/pagination?${params}`);

//   return data;
// };

export const getAllOrders = async ({
  page = 1,
  limit = 10,
  paymentMethod,
  paymentStatus,
  status,
  dateFilter,
}: orderFilter) => {
  const params = new URLSearchParams();

  params.append("page", page.toString());
  params.append("limit", limit.toString());

  if (paymentMethod) params.append("paymentMethod", paymentMethod);
  if (paymentStatus) params.append("paymentStatus", paymentStatus);
  if (status) params.append("status", status);
  if (dateFilter) params.append("dateFilter", dateFilter);

  const { data } = await AxiosInstance.get(`/order?${params.toString()}`);

  return data;
};

export const getTodayOrders = async ({ page = 1, limit = 10 }: orderFilter) => {
  const params = new URLSearchParams();

  params.append("page", page.toString());
  params.append("limit", limit.toString());

  const { data } = await AxiosInstance.get(`/order/today?${params.toString()}`);

  return data;
};


export const getTodayOrderLength = async () => {
  const { data } = await AxiosInstance.get("/order/today");

  return data;
};

export const deleteOrder = async (id: string) => {
  const { data } = await AxiosInstance.delete(`/order/${id}`);
  return data;
};

export const updateOrder = async ({
  id,
  payload,
}: {
  id: string;
  payload: {
    status: string;
  };
}) => {
  const { data } = await AxiosInstance.patch(`/order/${id}`, payload);

  return data;
};
