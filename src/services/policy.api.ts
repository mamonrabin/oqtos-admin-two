import { AxiosInstance } from "../lib/AxiosInstance";

export const createPolicy = async (formData: FormData) => {
  const { data } = await AxiosInstance.post("/policy/create-policy", formData);
  return data;
};

export const getAllPolicys = async () => {
  const { data } = await AxiosInstance.get("/policy");
  return data;
};

export type TPolicyType =
  | "privacy"
  | "condition"
  | "return"
  | "order"
  | "shipping";

export const getAllPolicyByType = async (type?: TPolicyType) => {
  const { data } = await AxiosInstance.get("/policy", {
    params: type ? { type } : {},
  });

  return data;
};

export const deletePolicy = async (id: string) => {
  const { data } = await AxiosInstance.delete(`/policy/${id}`);
  return data;
};

export const updatePolicy = async ({
  id,
  payload,
}: {
  id: string;
  payload: {
    title?: string;
    description?: string;
    type?: string;
    status?:string;
  };
}) => {
  const { data } = await AxiosInstance.patch(`/policy/${id}`, payload);

  return data;
};
