import { useCopilQuery } from "../generated/graphql";
import { useGetIntId } from "./useGetIntId";

export const useGetCopilFromUrl = () => {
  const intId = useGetIntId();

  return useCopilQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });
};
