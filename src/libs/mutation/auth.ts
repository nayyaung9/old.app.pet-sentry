import { AxiosError } from "axios";
import { MutationOptions, useMutation } from "@tanstack/react-query";
import apiInstance from "~/libs/api";
import { handleError } from "~/utils/handleError";

type MutationAuthResponse = {
  user: PetSentry.Account;
  token: string;
};

type MutationVarsLogin = {
  email: string;
  password: string;
};
const loginMutationFunction = async (params: MutationVarsLogin) => {
  try {
    const { data } = await apiInstance.post("/auth/authenticate", {
      ...params,
    });
    return data;
  } catch (error) {
    return handleError(error);
  }
};

const useLoginMutation = (
  options: MutationOptions<MutationAuthResponse, AxiosError, MutationVarsLogin>
) => {
  return useMutation(loginMutationFunction, options);
};

/* Register with Email */
type MutationEmailRegister = {
  fullname: string;
  email: string;
  password: string;
};
const registerEmailMutationFunction = async (params: MutationEmailRegister) => {
  try {
    const { data } = await apiInstance.post("/auth/register", {
      ...params,
    });
    return data;
  } catch (error) {
    return handleError(error);
  }
};
const useRegisterEmailMutation = (
  options: MutationOptions<
    MutationAuthResponse,
    AxiosError,
    MutationEmailRegister
  >
) => {
  return useMutation(registerEmailMutationFunction, options);
};
/* Register with Email */

export { useLoginMutation, useRegisterEmailMutation };
