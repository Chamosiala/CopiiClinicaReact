import { dedupExchange, fetchExchange, gql } from "@urql/core";
import { Cache, cacheExchange } from "@urql/exchange-graphcache";
import {
  CreatePrezentaMutationVariables,
  CreatePrezentaTopicMutationVariables,
  DeleteCopilMutationVariables,
  DeletePrezentaTopicMutationVariables,
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  RegisterMutation,
} from "../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";

// const invalidateAllCopii = (cache: Cache) => {
//   const allFields = cache.inspectFields("Query");
//   console.log("allFields: ", allFields);
//   const fieldInfos = allFields.filter((info) => info.fieldName === "copii");
//   fieldInfos.forEach((fi) => {
//     console.log("fi arguments: ", fi.arguments);
//     cache.invalidate("Query", "copii", fi.arguments || {});
//   });
// };

export const createUrqlClient = (ssrExchange: any) => ({
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include" as const,
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          deleteCopil: (_result, args, cache, info) => {
            cache.invalidate({
              __typename: "Copil",
              id: (args as DeleteCopilMutationVariables).id,
            });
          },

          deletePrezentaTopic: (_result, args, cache, info) => {
            cache.invalidate({
              __typename: "PrezentaTopic",
              id: (args as DeletePrezentaTopicMutationVariables).id,
            });
          },

          createPrezenta: (_result, args, cache, info) => {
            cache.invalidate({
              __typename: "Copil",
              id: (args as CreatePrezentaMutationVariables).copilId,
            });
          },

          createPrezentaTopic: (_result, args, cache, info) => {
            cache.invalidate({
              __typename: "Prezenta",
              id: (args as CreatePrezentaTopicMutationVariables).prezentaId,
            });
          },

          createCopil: (_result, args, cache, info) => {
            cache.invalidate({
              __typename: "Copil",
            });
          },

          login: (_result, args, cache, info) => {
            betterUpdateQuery<LoginMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.login.errors) {
                  return query;
                } else {
                  return {
                    me: result.login.user,
                  };
                }
              }
            );
          },

          logout: (_result, args, cache, info) => {
            betterUpdateQuery<LogoutMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              () => ({ me: null })
            );
          },

          register: (_result, args, cache, info) => {
            betterUpdateQuery<RegisterMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.register.errors) {
                  return query;
                } else {
                  return {
                    me: result.register.user,
                  };
                }
              }
            );
          },
        },
      },
    }),
    ssrExchange,
    fetchExchange,
  ],
});