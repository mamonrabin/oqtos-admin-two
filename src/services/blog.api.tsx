import { AxiosInstance } from "../lib/AxiosInstance";

export const createBlog = async (formData: FormData) => {
  const { data } = await AxiosInstance.post(
    "/blog/create-blog",
    formData,
  );
  return data;
};

export const getAllBlogs = async () => {
  const { data } = await AxiosInstance.get("/blog");
  return data;
};



export const deleteBlog = async (id: string) => {
  const { data } = await AxiosInstance.delete(`/blog/${id}`);
  return data;
};



export const updateBlogStatus = async ({
  id,
  status,
}: {
  id: string;
  status: "draft" | "published";
}) => {
  const { data } = await AxiosInstance.patch(
    `/blog/${id}/status`,
    {
      status,
    }
  );

  return data;
};

// export const updateBlog = async ({
//   id,
//   formData,
// }: {
//   id: string;
//   formData: FormData;
// }) => {
//   const { data } = await AxiosInstance.put(`/blog/${id}`, formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });

//   return data;
// };


export const updateBlog = async ({
  id,
  formData,
}: {
  id: string;
  formData: FormData;
}) => {
  const { data } = await AxiosInstance.put(
    `/blog/${id}`,
    formData
  );

  return data;
};


