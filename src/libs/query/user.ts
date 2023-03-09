import petSentryAPI from "~/libs/api";
import { useQuery } from "@tanstack/react-query";
import { handleError } from "~/utils/handleError";

type CurrentUserQueryKey = ["Me"];

const fetchMe = async () => {
  try {
    const { data } = await petSentryAPI.get("/auth/me");
    return data.user;
  } catch (err) {
    handleError(err);
  }
};
const useMe = () => {
  const queryKey: CurrentUserQueryKey = ["Me"];
  return useQuery<PetSentry.Account>(queryKey, fetchMe);
};

export { useMe };
