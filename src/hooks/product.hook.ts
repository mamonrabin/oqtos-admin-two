import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProducts,

  updateProduct,
} from "../services/product.api";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => createProduct(formData),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
};

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
};

// type GetProductsParams = {
//   page?: number;
//   limit?: number;
//   brand?: string;
//   category?: string;
//   subCategory?: string;
//   dateFilter?: string;
// };



export type ProductFilter = {
  page?: number;
  limit?: number;
  brand?: string;
  category?: string;
  subCategory?: string;
  dateFilter?: string;
};

export const useAllProducts = ({
  page = 1,
  limit = 10,
  brand,
  category,
  subCategory,
  dateFilter
}: ProductFilter) => {
  return useQuery({
    queryKey: ["products", page, limit, brand, category, subCategory,dateFilter],
    queryFn: () => getAllProducts({page,
        limit,
        brand,
        category,
        subCategory,dateFilter}),
    placeholderData: (previousData) => previousData,
  });
};



// export const useAllProducts = (filters: ProductFilter) => {
//   return useQuery({
//     queryKey: ["products", filters],
//     queryFn: () => getAllProducts(filters),
//     placeholderData: (previousData) => previousData,
//   });
// };

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteProduct(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProduct,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
};
