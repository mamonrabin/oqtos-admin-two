import { AxiosInstance } from "../lib/AxiosInstance";

export const createSocial = async (formData: FormData) => {
  const { data } = await AxiosInstance.post("/socialIcon/create-socialIcon", formData);
  return data;

  
};

export const getAllSocials = async () => {
  const { data } = await AxiosInstance.get("/socialIcon");
  return data;
};

export const deleteSocial = async (id: string) => {
  const { data } = await AxiosInstance.delete(`/socialIcon/${id}`);
  return data;
};

export const updateSocial = async ({
  id,
  payload,
}: {
  id: string;
  payload: {
    link?: string;
    socialType?: string;
    status?: string;
  };
}) => {
  const { data } = await AxiosInstance.patch(`/socialIcon/${id}`, payload);

  return data;
};
