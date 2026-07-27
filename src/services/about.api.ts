import { AxiosInstance } from "../lib/AxiosInstance";

export const createAbout = async (formData: FormData) => {
  const { data } = await AxiosInstance.post("/about/create-about", formData);
  return data;
};

export const getAllAbouts = async () => {
  const { data } = await AxiosInstance.get("/about");
  return data;
};

//

export const deleteAbout = async (id: string) => {
  const { data } = await AxiosInstance.delete(`/about/${id}`);
  return data;
};

export const updateAbout = async ({
  id,
  payload,
}: {
  id: string;
  payload: {
    description?: string;
    type?: string;
  };
}) => {
  const { data } = await AxiosInstance.patch(`/about/${id}`, payload);

  return data;
};
