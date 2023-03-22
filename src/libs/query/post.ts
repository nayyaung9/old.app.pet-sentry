import PetSentry from "~/libs/api";
import {
  QueryFunctionContext,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { handleError } from "~/utils/handleError";
import { AxiosError } from "axios";

export type PostQueryKey = ["Posts", { activityType: string }];

const fetchPosts = async ({ queryKey }: QueryFunctionContext<PostQueryKey>) => {
  const { activityType } = queryKey[1];
  try {
    const { data } = await PetSentry.post("/post/fetch-posts", {
      activityType,
    });
    return data.data;
  } catch (err) {
    handleError(err);
  }
};
const usePosts = ({ ...queryKeyParams }: PostQueryKey[1]) => {
  const queryKey: PostQueryKey = ["Posts", { ...queryKeyParams }];
  return useQuery(queryKey, fetchPosts);
};

// Fetch Owner Posts
export type PostOwnerQueryKey = ["Owner-Posts"];

const fetchOwnerPosts = async () => {
  try {
    const { data } = await PetSentry.get("/post/fetch-owner-posts");
    return data.data;
  } catch (err) {
    handleError(err);
  }
};
const useOwnerPosts = () => {
  const queryKey: PostOwnerQueryKey = ["Owner-Posts"];
  return useQuery(queryKey, fetchOwnerPosts);
};
// Fetch Owner Posts

export type PostDetailQueryPost = ["Post", { postId: string }];

const fetchPostDetail = async ({
  queryKey,
}: QueryFunctionContext<PostDetailQueryPost>) => {
  const { postId } = queryKey[1];
  console.log(postId);
  try {
    const { data } = await PetSentry.get(`/post/post/${postId}`);
    return data.data;
  } catch (err) {
    handleError(err);
  }
};

const usePostDetail = ({ ...queryKeyParams }: PostDetailQueryPost[1]) => {
  const queryKey: PostDetailQueryPost = ["Post", { ...queryKeyParams }];

  return useQuery(queryKey, fetchPostDetail);
};

export { usePosts, useOwnerPosts, usePostDetail };
