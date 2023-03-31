import petSentryAPI from "~/libs/api";
import { useQuery } from "@tanstack/react-query";
import { handleError } from "~/utils/handleError";

export type ProfileQueryKey = ["Profile-Me"];

const fetchMe = async () => {
  try {
    const { data } = await petSentryAPI.get<{
      user: PetSentry.Account;
      postCount: number;
    }>("/auth/me");
    return { user: data.user, postCount: data?.postCount };
  } catch (err) {
    handleError(err);
  }
};
const useMe = () => {
  const queryKey: ProfileQueryKey = ["Profile-Me"];
  return useQuery(queryKey, fetchMe);
};

export { useMe };
