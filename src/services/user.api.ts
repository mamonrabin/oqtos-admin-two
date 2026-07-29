import { AxiosInstance } from "../lib/AxiosInstance";

// export const getAllCoupons = async () => {
//   const { data } = await AxiosInstance.get("/coupon");
//   return data;
// };

export const getAllUsers = async (
  page: number,
  limit: number,
  dateFilter: string,
) => {
  const { data } = await AxiosInstance.get(
    `/user?page=${page}&limit=${limit}&dateFilter=${dateFilter}`,
  );

  return data;
};

export const getAllStaffs = async () => {
  const { data } = await AxiosInstance.get("/user/staffs");
  return data;
};

export const deleteUser = async (id: string) => {
  const { data } = await AxiosInstance.delete(`/user/${id}`);
  return data;
};

// export const updateUser = async ({
//   id,
//   formData,
// }: {
//   id: string;
//   formData: FormData;
// }) => {
//   const { data } = await AxiosInstance.patch(`/user/${id}`, formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });

//   return data;
// };

export const updateUser = async ({
  id,
  payload,
}: {
  id: string;
  payload: {
    role?: string;
    isActive?: string;
    name?: string;
    phone?: string;
    address?: string;
  };
}) => {
  const { data } = await AxiosInstance.patch(`/user/${id}`, payload);

  return data;
};
