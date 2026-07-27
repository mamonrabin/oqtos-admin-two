import { AxiosInstance } from "../lib/AxiosInstance";

export const createCoupon = async (formData: FormData) => {
  const { data } = await AxiosInstance.post("/coupon/create-coupon", formData);
  return data;
};

export const getAllCoupons = async () => {
  const { data } = await AxiosInstance.get("/coupon");
  return data;
};

export const getCoupons = async (page: number, limit: number) => {
  const { data } = await AxiosInstance.get(
    `/coupon/pagination?page=${page}&limit=${limit}`,
  );

  return data;
};

// export const getCoupons = async (page: number, limit: number) => {
//   const { data } = await AxiosInstance.get(
//     `/coupon/pagination?page=${page}&limit=${limit}`,
//   );

//   return data;
// };


export const deleteCoupon = async (id: string) => {
  const { data } = await AxiosInstance.delete(`/coupon/${id}`);
  return data;
};

type TUpdateCouponPayload = {
  status?:string;
  code?: string;
  discount?: number;
  discountType?: string;
  useLimit?: number;
  perUserLimit?: number;
  startDate?: string;
  expireDate?: string;
  couponType?: string;
};

export const updateCoupon = async ({
  id,
  payload,
}: {
  id: string;
  payload: TUpdateCouponPayload;
}) => {
  const { data } = await AxiosInstance.put(`/coupon/${id}`, payload);
  return data;
};
