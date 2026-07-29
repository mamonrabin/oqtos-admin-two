import { AxiosInstance } from "@/lib/AxiosInstance";

export const createCategory = async (formData: FormData) => {
  const { data } = await AxiosInstance.post(
    "/category/create-category",
    formData,
  );
  return data;
};

export const getAllCategories = async () => {
  const { data } = await AxiosInstance.get("/category/all");
  return data;
};

// export const getCategories = async (page: number, limit: number) => {
//   const { data } = await AxiosInstance.get(
//     `/category/pagination?page=${page}&limit=${limit}`,
//   );

//   return data;
// };

export const getCategories = async (page = 1, limit = 10) => {
  const { data } = await AxiosInstance.get(
    `/category?page=${page}&limit=${limit}`
  );

  return data;
};

export const deleteCategory = async (id: string) => {
  const { data } = await AxiosInstance.delete(`/category/${id}`);
  return data;
};

export const updateCategory = async ({
  id,
  formData,
}: {
  id: string;
  formData: FormData;
}) => {
  const { data } = await AxiosInstance.put(`/category/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};
