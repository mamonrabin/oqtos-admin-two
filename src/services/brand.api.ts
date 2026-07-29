import { AxiosInstance } from "../lib/AxiosInstance";

export const createBrand = async (formData: FormData) => {
  const { data } = await AxiosInstance.post(
    "/brand/create-brand",
    formData,
  );
  return data;
};

export const getAllBrands = async () => {
  const { data } = await AxiosInstance.get("/brand/all");
  return data;
};

export const getBrands = async (page: number, limit: number) => {
  const { data } = await AxiosInstance.get(
    `/brand?page=${page}&limit=${limit}`,
  );

  return data;
};


export const getCategories = async (page = 1, limit = 10) => {
  const { data } = await AxiosInstance.get(
    `/category?page=${page}&limit=${limit}`
  );

  return data;
};

export const deleteBrand = async (id: string) => {
  const { data } = await AxiosInstance.delete(`/brand/${id}`);
  return data;
};

export const updateBrand = async ({
  id,
  formData,
}: {
  id: string;
  formData: FormData;
}) => {
  const { data } = await AxiosInstance.put(`/brand/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};
