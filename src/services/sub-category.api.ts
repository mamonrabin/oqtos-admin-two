import { AxiosInstance } from "../lib/AxiosInstance";

export const createSubCategory = async (formData: FormData) => {
  const { data } = await AxiosInstance.post(
    "/sub-category/create-subcategory",
    formData,
  );
  return data;
};

export const getAllSubCategories = async () => {
  const { data } = await AxiosInstance.get("/sub-category/all");
  return data;
};

export const getSubCategories = async (page: number, limit: number) => {
  const { data } = await AxiosInstance.get(
    `/sub-category?page=${page}&limit=${limit}`,
  );

  return data;
};

export const deleteSubCategory = async (id: string) => {
  const { data } = await AxiosInstance.delete(`/sub-category/${id}`);
  return data;
};

export const updateSubCategory = async ({
  id,
  formData,
}: {
  id: string;
  formData: FormData;
}) => {
  const { data } = await AxiosInstance.put(`/sub-category/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};
