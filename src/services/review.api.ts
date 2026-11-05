import { AxiosInstance } from "../lib/AxiosInstance";

export const createReview = async (formData: FormData) => {
  const { data } = await AxiosInstance.post("/review/create-review", formData);
  return data;
};

export const getAllReviews = async (page: number, limit: number) => {
  const { data } = await AxiosInstance.get(
    `/review/all?page=${page}&limit=${limit}`,
  );
  return data;
};

export const deleteReview = async (id: string) => {
  const { data } = await AxiosInstance.delete(`/review/${id}`);
  return data;
};

export const updateReview = async ({
  id,
  payload,
}: {
  id: string;
  payload: {
    status: string;
  };
}) => {
  const { data } = await AxiosInstance.patch(`/review/${id}`, payload);

  return data;
};
