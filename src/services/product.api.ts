import { AxiosInstance } from "../lib/AxiosInstance";

export const createProduct = async (formData: FormData) => {
  const { data } = await AxiosInstance.post(
    "/product/create-product",
    formData,
    {
      timeout: 60000, // 60 seconds
    },
  );
  return data;
};

export const getProducts = async () => {
  const { data } = await AxiosInstance.get("/product/withoutBuilder");
  return data;
};

// export const getAllProducts = async (page: number, limit: number) => {
//   const { data } = await AxiosInstance.get(
//     `/product/pagination?page=${page}&limit=${limit}`,
//   );

//   return data;
// };

// export const getAllProducts = async (filters: ProductFilter) => {
//   const params = new URLSearchParams();

//   Object.entries(filters).forEach(([key, value]) => {
//     if (value) params.append(key, String(value));
//   });

//   const { data } = await AxiosInstance.get(`/product/pagination?${params}`);

//   return data;
// };

export type ProductFilter = {
  page?: number;
  limit?: number;
  brand?: string;
  category?: string;
  subCategory?: string;
  dateFilter?: string;
};

export const getAllProducts = async ({
  page = 1,
  limit = 10,
  brand,
  category,
  subCategory,
  dateFilter
}: ProductFilter) => {

  const params = new URLSearchParams();

  params.append("page", page.toString());
  params.append("limit", limit.toString());

  if (brand) params.append("brand", brand);
  if (category) params.append("category", category);
  if (subCategory) params.append("subCategory", subCategory);
  if (dateFilter) params.append("dateFilter", dateFilter);


  // const { data } = await AxiosInstance.get(
  //   `/product?page=${page}&limit=${limit}`,
  // );

   const { data } = await AxiosInstance.get(`/product?${params.toString()}`);

  return data;
};

export const deleteProduct = async (id: string) => {
  const { data } = await AxiosInstance.delete(`/product/${id}`);
  return data;
};

export const updateProduct = async ({
  id,
  formData,
}: {
  id: string;
  formData: FormData;
}) => {
  const { data } = await AxiosInstance.put(`/product/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};
