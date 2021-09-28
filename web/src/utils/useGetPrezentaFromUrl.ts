import { usePrezentaQuery } from "../generated/graphql";
import { useGetIntId } from "./useGetIntId";

export const useGetPrezentaFromUrl = () => {
  const intId = useGetIntId();

  return usePrezentaQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });
};
