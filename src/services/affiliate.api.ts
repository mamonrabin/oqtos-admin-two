import { AxiosInstance } from "../lib/AxiosInstance";

export const createAffiliate = async (formData: FormData) => {
  const { data } = await AxiosInstance.post(
    "/affiliate/create-affiliate",
    formData,
  );
  return data;
};

export const getAllAffiliate = async () => {
  const { data } = await AxiosInstance.get("/affiliate");
  return data;
};

//

export const deleteAffiliate = async (id: string) => {
  const { data } = await AxiosInstance.delete(`/affiliate/${id}`);
  return data;
};

export const updateAffiliate = async ({
  id,
  payload,
}: {
  id: string;
  payload: {
    description?: string;
    type?: string;
  };
}) => {
  const { data } = await AxiosInstance.patch(`/affiliate/${id}`, payload);

  return data;
};
