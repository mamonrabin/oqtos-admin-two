import { AxiosInstance } from "../lib/AxiosInstance";

export const createTheme = async (formData: FormData) => {
  const { data } = await AxiosInstance.post("/theme/create-theme", formData);
  return data;
};

export const getAllThemes = async () => {
  const { data } = await AxiosInstance.get("/theme");
  return data;
};



export const deleteTheme = async (id: string) => {
  const { data } = await AxiosInstance.delete(`/theme/${id}`);
  return data;
};

export const updateTheme = async ({
  id,
  payload,
}: {
  id: string;
  payload: {
    primary?: string;
    secondary?: string;
    font?: string;
    status?:string;
  };
}) => {
  const { data } = await AxiosInstance.patch(`/theme/${id}`, payload);

  return data;
};
