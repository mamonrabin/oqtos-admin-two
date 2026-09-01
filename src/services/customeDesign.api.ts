import { AxiosInstance } from "@/lib/AxiosInstance";
import { TCustome } from "@/types/customeType";

export const getAllCustomeDesign = async () => {
  const { data } = await AxiosInstance.get("/custome");
  return data;
};


export const updateCustomeDesign = async ({
  id,
  payload,
}: {
  id: string;
  payload: Partial<TCustome>;
}) => {
  const { data } = await AxiosInstance.patch(
    `/custome/${id}`,
    payload,
  );

  return data;
};
