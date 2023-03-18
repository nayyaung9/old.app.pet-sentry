import { AxiosError } from "axios";
import { MutationOptions, useMutation } from "@tanstack/react-query";
import apiInstance from "~/libs/api";
import { handleError } from "~/utils/handleError";

// Moderator
type MutationVarsPost = {
  geolocation: number[];
  address: string;
  petName: string | null;
  petType: string;
  information: string;
  collarColor: string;
  activityType: string;
  specialTraits: string | null;
  gender: string;
  photos: any;
  activityDate: Date;
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

type DeletePostParams = {
  postId: string;
};
const deletePostFunction = async ({ postId }: DeletePostParams) => {
  try {
    const { data } = await apiInstance.delete(`/post/${postId}/delete`);
    return data;
  } catch (error) {
    return handleError(error);
  }
};
const usePostDeleteMutation = (
  options: MutationOptions<PetSentry.Post, AxiosError, DeletePostParams>
) => {
  return useMutation(deletePostFunction, options);
};

export { usePostCreateMutation, usePostDeleteMutation };
