import PetSentry from "~/libs/api";
import {
  QueryFunctionContext,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { handleError } from "~/utils/handleError";
import { AxiosError } from "axios";

type PostQueryKey = ["Posts", { activityType: string }];

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
type PostOwnerQueryKey = ["Owner-Posts"];

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

type PostDetailQueryPost = ["Post", { postId: string }];

const fetchPostDetail = async ({
  queryKey,
}: QueryFunctionContext<PostDetailQueryPost>) => {
  const { postId } = queryKey[1];
  try {
    const { data } = await PetSentry.get(`/post/post/${postId}`);
    return data.data;
  } catch (err) {
    handleError(err);
  }
};

const usePostDetail = ({
  options,
  ...queryKeyParams
}: PostDetailQueryPost[1] & {
  options?: UseQueryOptions<PetSentry.Post, AxiosError>;
}) => {
  const queryKey: PostDetailQueryPost = ["Post", { ...queryKeyParams }];

  return useQuery(queryKey, fetchPostDetail, options);
};

export { usePosts, useOwnerPosts, usePostDetail };
