import { AxiosInstance } from "../lib/AxiosInstance";

// export const singIn = async (formData: FormData) => {
//   const { data } = await AxiosInstance.post("/auth/login", formData);
//   return data;
// };

export const singIn = async (formData: FormData) => {
  const { data } = await AxiosInstance.post("/auth/login", formData);

  if (data?.data?.accessToken) {
    localStorage.setItem("accessToken", data.data.accessToken);
  }

  return data;
};


export const singOut = async () => {
  const { data } = await AxiosInstance.post("/auth/logout");
  return data;
};

export const getSupperAdmin = async () => {
  const { data } = await AxiosInstance.get("/user/me");
  return data;
};

//

// export const deleteAbout = async (id: string) => {
//   const { data } = await AxiosInstance.delete(`/about/${id}`);
//   return data;
// };

// export const updateAbout = async ({
//   id,
//   payload,
// }: {
//   id: string;
//   payload: {
//     description?: string;
//     type?: string;
//   };
// }) => {
//   const { data } = await AxiosInstance.patch(`/about/${id}`, payload);

//   return data;
// };
