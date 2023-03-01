import { AxiosError } from "axios";
import { MutationOptions, useMutation } from "@tanstack/react-query";
import apiInstance from "~/libs/api";
import { handleError } from "~/utils/handleError";

// Moderator
type MutationVarsPost = {
  geolocation: number[];
  address: string;
  petName: string;
  petType: string;
  information: string;
  collarColor: string;
  activityType: string;
  specialTraits: string;
  gender: string;
  photos: any;
  activityDate: string;
};
const createPostMutationFunction = async (params: MutationVarsPost) => {
  try {
    const { data } = await apiInstance.post("/post/create-new-post", {
      ...params,
    });
    return data;
  } catch (error) {
    return handleError(error);
  }
};

const usePostCreateMutation = (
  options: MutationOptions<PetSentry.Post, AxiosError, MutationVarsPost>
) => {
  return useMutation(createPostMutationFunction, options);
};

export { usePostCreateMutation };
