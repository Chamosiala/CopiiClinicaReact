import { dedupExchange, fetchExchange, gql } from "@urql/core";
import { cacheExchange } from "@urql/exchange-graphcache";
import {
  CopiiDocument,
  CopiiQuery,
  CreateCopilMutation,
  CreateCopilMutationVariables,
  CreatePrezentaMutation,
  CreatePrezentaMutationVariables,
  CreatePrezentaTopicMutationVariables,
  DeleteCopilMutationVariables,
  DeletePrezentaMutationVariables,
  DeletePrezentaTopicMutationVariables,
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  PrezenteDocument,
  PrezenteQuery,
  RegisterMutation,
} from "../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";

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

          deletePrezenta: (_result, args, cache, info) => {
            cache.invalidate({
              __typename: "Prezenta",
              id: (args as DeletePrezentaMutationVariables).id,
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

            betterUpdateQuery<CreatePrezentaMutation, PrezenteQuery>(
              cache,
              { query: PrezenteDocument },
              _result,
              (result, query) => {
                if (result.createPrezenta.errors) {
                  return query;
                } else {
                  return {
                    prezente: query.prezente.push(
                      result.createPrezenta.prezenta
                    ),
                  };
                }
              }
            );
          },

          createPrezentaTopic: (_result, args, cache, info) => {
            cache.invalidate({
              __typename: "Prezenta",
              id: (args as CreatePrezentaTopicMutationVariables).prezentaId,
            });
          },

          createCopil: (_result, args, cache, info) => {
            betterUpdateQuery<CreateCopilMutation, CopiiQuery>(
              cache,
              { query: CopiiDocument },
              _result,
              (result, query) => {
                if (result.createCopil.errors) {
                  return query;
                } else {
                  return {
                    copii: query.copii.push(result.createCopil.copil),
                  };
                }
              }
            );
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
