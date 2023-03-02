import { AxiosError } from "axios";
import { MutationOptions, useMutation } from "@tanstack/react-query";
import apiInstance from "~/libs/api";
import { handleError } from "~/utils/handleError";

type MutationVarsLogin = {
  email: string;
  password: string;
};
type MutationLoginResponse = {
  user: PetSentry.Account;
  token: string;
};
const loginMutationFunction = async (params: MutationVarsLogin) => {
  try {
    const { data } = await apiInstance.post("/auth/authenticate", { ...params });
    return data;
  } catch (error) {
    return handleError(error);
  }
};

const useLoginMutation = (
  options: MutationOptions<MutationLoginResponse, AxiosError, MutationVarsLogin>
) => {
  return useMutation(loginMutationFunction, options);
};

/* Register with Email */
type MutationEmailRegister = {
  username: string;
  email: string;
  password: string;
};
const registerEmailMutationFunction = async (params: MutationEmailRegister) => {
  const body = {
    ...params,
    agreement: "true",
    reason: "test",
    locale: "en",
  };
  try {
    const { data } = await apiInstance.post(
      "/api/v1/register_with_email",
      body
    );
    return data;
  } catch (error) {
    return handleError(error);
  }
};
const useRegisterEmailMutation = (
  options: MutationOptions<any, AxiosError, MutationEmailRegister>
) => {
  return useMutation(registerEmailMutationFunction, options);
};
/* Register with Email */

export { useLoginMutation, useRegisterEmailMutation };
