import PetSentry from "~/libs/api";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { handleError } from "~/utils/handleError";

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

export { usePosts };
