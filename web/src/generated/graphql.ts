import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Copil = {
  __typename?: 'Copil';
  createdAt: Scalars['String'];
  id: Scalars['Float'];
  nume: Scalars['String'];
  prenume: Scalars['String'];
  prezente?: Maybe<Array<Prezenta>>;
  updatedAt: Scalars['String'];
  varsta: Scalars['Float'];
};

export type CopilInput = {
  nume: Scalars['String'];
  prenume: Scalars['String'];
  varsta: Scalars['Float'];
};

export type CopilResponse = {
  __typename?: 'CopilResponse';
  copil?: Maybe<Copil>;
  errors?: Maybe<Array<FieldError>>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCopil: CopilResponse;
  createPrezenta: PrezentaResponse;
  createPrezentaTopic: PrezentaTopicResponse;
  deleteCopil: Scalars['Boolean'];
  deletePrezenta: Scalars['Boolean'];
  deletePrezentaTopic: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
};


export type MutationCreateCopilArgs = {
  input: CopilInput;
};


export type MutationCreatePrezentaArgs = {
  copilId: Scalars['Int'];
  input: PrezentaInput;
};


export type MutationCreatePrezentaTopicArgs = {
  input: PrezentaTopicInput;
  prezentaId: Scalars['Int'];
  tip: Scalars['String'];
};


export type MutationDeleteCopilArgs = {
  id: Scalars['Int'];
};


export type MutationDeletePrezentaArgs = {
  id: Scalars['Int'];
};


export type MutationDeletePrezentaTopicArgs = {
  id: Scalars['Int'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};

export type Prezenta = {
  __typename?: 'Prezenta';
  copil: Copil;
  copilId: Scalars['Float'];
  createdAt: Scalars['String'];
  data: Scalars['DateTime'];
  dataFrumoasa: Scalars['String'];
  id: Scalars['Float'];
  prezent: Scalars['Boolean'];
  prezentaTopics?: Maybe<Array<PrezentaTopic>>;
  updatedAt: Scalars['String'];
};

export type PrezentaInput = {
  data: Scalars['DateTime'];
  prezent: Scalars['Boolean'];
};

export type PrezentaResponse = {
  __typename?: 'PrezentaResponse';
  errors?: Maybe<Array<FieldError>>;
  prezenta?: Maybe<Prezenta>;
};

export type PrezentaTopic = {
  __typename?: 'PrezentaTopic';
  createdAt: Scalars['String'];
  detalii: Scalars['String'];
  id: Scalars['Float'];
  prezentaId: Scalars['Float'];
  tip: Scalars['String'];
  titlu: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type PrezentaTopicInput = {
  detalii: Scalars['String'];
  titlu: Scalars['String'];
};

export type PrezentaTopicResponse = {
  __typename?: 'PrezentaTopicResponse';
  errors?: Maybe<Array<FieldError>>;
  prezentaTopic?: Maybe<PrezentaTopic>;
};

export type Query = {
  __typename?: 'Query';
  copii: Array<Copil>;
  copil?: Maybe<Copil>;
  hello: Scalars['String'];
  me?: Maybe<User>;
  prezenta?: Maybe<Prezenta>;
  prezentaTopic?: Maybe<PrezentaTopic>;
  prezente: Array<Prezenta>;
};


export type QueryCopilArgs = {
  id: Scalars['Int'];
};


export type QueryPrezentaArgs = {
  id: Scalars['Int'];
};


export type QueryPrezentaTopicArgs = {
  id: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['Float'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UsernamePasswordInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type RegularCopilFragment = { __typename?: 'Copil', id: number, createdAt: string, updatedAt: string, nume: string, prenume: string, varsta: number, prezente?: Maybe<Array<{ __typename?: 'Prezenta', id: number, createdAt: string, updatedAt: string, copilId: number, data: any, dataFrumoasa: string, prezent: boolean, copil: { __typename?: 'Copil', nume: string, prenume: string, varsta: number }, prezentaTopics?: Maybe<Array<{ __typename?: 'PrezentaTopic', id: number, createdAt: string, updatedAt: string, titlu: string, detalii: string, tip: string, prezentaId: number }>> }>> };

export type RegularErrorFragment = { __typename?: 'FieldError', field: string, message: string };

export type RegularPrezentaFragment = { __typename?: 'Prezenta', id: number, createdAt: string, updatedAt: string, copilId: number, data: any, dataFrumoasa: string, prezent: boolean, copil: { __typename?: 'Copil', nume: string, prenume: string, varsta: number }, prezentaTopics?: Maybe<Array<{ __typename?: 'PrezentaTopic', id: number, createdAt: string, updatedAt: string, titlu: string, detalii: string, tip: string, prezentaId: number }>> };

export type RegularPrezentaTopicFragment = { __typename?: 'PrezentaTopic', id: number, createdAt: string, updatedAt: string, titlu: string, detalii: string, tip: string, prezentaId: number };

export type RegularUserFragment = { __typename?: 'User', id: number, username: string };

export type RegularUserResponseFragment = { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename?: 'User', id: number, username: string }> };

export type CreateCopilMutationVariables = Exact<{
  input: CopilInput;
}>;


export type CreateCopilMutation = { __typename?: 'Mutation', createCopil: { __typename?: 'CopilResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, copil?: Maybe<{ __typename?: 'Copil', id: number, createdAt: string, updatedAt: string, nume: string, prenume: string, varsta: number, prezente?: Maybe<Array<{ __typename?: 'Prezenta', id: number, createdAt: string, updatedAt: string, copilId: number, data: any, dataFrumoasa: string, prezent: boolean, copil: { __typename?: 'Copil', nume: string, prenume: string, varsta: number }, prezentaTopics?: Maybe<Array<{ __typename?: 'PrezentaTopic', id: number, createdAt: string, updatedAt: string, titlu: string, detalii: string, tip: string, prezentaId: number }>> }>> }> } };

export type CreatePrezentaMutationVariables = Exact<{
  copilId: Scalars['Int'];
  input: PrezentaInput;
}>;


export type CreatePrezentaMutation = { __typename?: 'Mutation', createPrezenta: { __typename?: 'PrezentaResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, prezenta?: Maybe<{ __typename?: 'Prezenta', id: number, createdAt: string, updatedAt: string, copilId: number, data: any, dataFrumoasa: string, prezent: boolean, copil: { __typename?: 'Copil', nume: string, prenume: string, varsta: number }, prezentaTopics?: Maybe<Array<{ __typename?: 'PrezentaTopic', id: number, createdAt: string, updatedAt: string, titlu: string, detalii: string, tip: string, prezentaId: number }>> }> } };

export type CreatePrezentaTopicMutationVariables = Exact<{
  prezentaId: Scalars['Int'];
  tip: Scalars['String'];
  input: PrezentaTopicInput;
}>;


export type CreatePrezentaTopicMutation = { __typename?: 'Mutation', createPrezentaTopic: { __typename?: 'PrezentaTopicResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, prezentaTopic?: Maybe<{ __typename?: 'PrezentaTopic', id: number, createdAt: string, updatedAt: string, titlu: string, detalii: string, tip: string, prezentaId: number }> } };

export type DeleteCopilMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteCopilMutation = { __typename?: 'Mutation', deleteCopil: boolean };

export type DeletePrezentaMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeletePrezentaMutation = { __typename?: 'Mutation', deletePrezenta: boolean };

export type DeletePrezentaTopicMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeletePrezentaTopicMutation = { __typename?: 'Mutation', deletePrezentaTopic: boolean };

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename?: 'User', id: number, username: string }> } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename?: 'User', id: number, username: string }> } };

export type CopiiQueryVariables = Exact<{ [key: string]: never; }>;


export type CopiiQuery = { __typename?: 'Query', copii: Array<{ __typename?: 'Copil', id: number, createdAt: string, updatedAt: string, nume: string, prenume: string, varsta: number, prezente?: Maybe<Array<{ __typename?: 'Prezenta', id: number, createdAt: string, updatedAt: string, copilId: number, data: any, dataFrumoasa: string, prezent: boolean, copil: { __typename?: 'Copil', nume: string, prenume: string, varsta: number }, prezentaTopics?: Maybe<Array<{ __typename?: 'PrezentaTopic', id: number, createdAt: string, updatedAt: string, titlu: string, detalii: string, tip: string, prezentaId: number }>> }>> }> };

export type CopilQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type CopilQuery = { __typename?: 'Query', copil?: Maybe<{ __typename?: 'Copil', id: number, createdAt: string, updatedAt: string, nume: string, prenume: string, varsta: number, prezente?: Maybe<Array<{ __typename?: 'Prezenta', id: number, createdAt: string, updatedAt: string, copilId: number, data: any, dataFrumoasa: string, prezent: boolean, copil: { __typename?: 'Copil', nume: string, prenume: string, varsta: number }, prezentaTopics?: Maybe<Array<{ __typename?: 'PrezentaTopic', id: number, createdAt: string, updatedAt: string, titlu: string, detalii: string, tip: string, prezentaId: number }>> }>> }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: Maybe<{ __typename?: 'User', id: number, username: string }> };

export type PrezentaQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type PrezentaQuery = { __typename?: 'Query', prezenta?: Maybe<{ __typename?: 'Prezenta', id: number, createdAt: string, updatedAt: string, copilId: number, data: any, dataFrumoasa: string, prezent: boolean, copil: { __typename?: 'Copil', nume: string, prenume: string, varsta: number }, prezentaTopics?: Maybe<Array<{ __typename?: 'PrezentaTopic', id: number, createdAt: string, updatedAt: string, titlu: string, detalii: string, tip: string, prezentaId: number }>> }> };

export type PrezentaTopicQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type PrezentaTopicQuery = { __typename?: 'Query', prezentaTopic?: Maybe<{ __typename?: 'PrezentaTopic', id: number, createdAt: string, updatedAt: string, titlu: string, detalii: string, tip: string, prezentaId: number }> };

export type PrezenteQueryVariables = Exact<{ [key: string]: never; }>;


export type PrezenteQuery = { __typename?: 'Query', prezente: Array<{ __typename?: 'Prezenta', id: number, createdAt: string, updatedAt: string, copilId: number, data: any, dataFrumoasa: string, prezent: boolean, copil: { __typename?: 'Copil', nume: string, prenume: string, varsta: number }, prezentaTopics?: Maybe<Array<{ __typename?: 'PrezentaTopic', id: number, createdAt: string, updatedAt: string, titlu: string, detalii: string, tip: string, prezentaId: number }>> }> };

export const RegularPrezentaTopicFragmentDoc = gql`
    fragment RegularPrezentaTopic on PrezentaTopic {
  id
  createdAt
  updatedAt
  titlu
  detalii
  tip
  prezentaId
}
    `;
export const RegularPrezentaFragmentDoc = gql`
    fragment RegularPrezenta on Prezenta {
  id
  createdAt
  updatedAt
  copilId
  copil {
    nume
    prenume
    varsta
  }
  prezentaTopics {
    ...RegularPrezentaTopic
  }
  data
  dataFrumoasa
  prezent
}
    ${RegularPrezentaTopicFragmentDoc}`;
export const RegularCopilFragmentDoc = gql`
    fragment RegularCopil on Copil {
  id
  createdAt
  updatedAt
  nume
  prenume
  varsta
  prezente {
    ...RegularPrezenta
  }
}
    ${RegularPrezentaFragmentDoc}`;
export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  username
}
    `;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  errors {
    ...RegularError
  }
  user {
    ...RegularUser
  }
}
    ${RegularErrorFragmentDoc}
${RegularUserFragmentDoc}`;
export const CreateCopilDocument = gql`
    mutation CreateCopil($input: CopilInput!) {
  createCopil(input: $input) {
    errors {
      ...RegularError
    }
    copil {
      ...RegularCopil
    }
  }
}
    ${RegularErrorFragmentDoc}
${RegularCopilFragmentDoc}`;

export function useCreateCopilMutation() {
  return Urql.useMutation<CreateCopilMutation, CreateCopilMutationVariables>(CreateCopilDocument);
};
export const CreatePrezentaDocument = gql`
    mutation CreatePrezenta($copilId: Int!, $input: PrezentaInput!) {
  createPrezenta(copilId: $copilId, input: $input) {
    errors {
      ...RegularError
    }
    prezenta {
      ...RegularPrezenta
    }
  }
}
    ${RegularErrorFragmentDoc}
${RegularPrezentaFragmentDoc}`;

export function useCreatePrezentaMutation() {
  return Urql.useMutation<CreatePrezentaMutation, CreatePrezentaMutationVariables>(CreatePrezentaDocument);
};
export const CreatePrezentaTopicDocument = gql`
    mutation CreatePrezentaTopic($prezentaId: Int!, $tip: String!, $input: PrezentaTopicInput!) {
  createPrezentaTopic(prezentaId: $prezentaId, tip: $tip, input: $input) {
    errors {
      ...RegularError
    }
    prezentaTopic {
      ...RegularPrezentaTopic
    }
  }
}
    ${RegularErrorFragmentDoc}
${RegularPrezentaTopicFragmentDoc}`;

export function useCreatePrezentaTopicMutation() {
  return Urql.useMutation<CreatePrezentaTopicMutation, CreatePrezentaTopicMutationVariables>(CreatePrezentaTopicDocument);
};
export const DeleteCopilDocument = gql`
    mutation DeleteCopil($id: Int!) {
  deleteCopil(id: $id)
}
    `;

export function useDeleteCopilMutation() {
  return Urql.useMutation<DeleteCopilMutation, DeleteCopilMutationVariables>(DeleteCopilDocument);
};
export const DeletePrezentaDocument = gql`
    mutation DeletePrezenta($id: Int!) {
  deletePrezenta(id: $id)
}
    `;

export function useDeletePrezentaMutation() {
  return Urql.useMutation<DeletePrezentaMutation, DeletePrezentaMutationVariables>(DeletePrezentaDocument);
};
export const DeletePrezentaTopicDocument = gql`
    mutation DeletePrezentaTopic($id: Int!) {
  deletePrezentaTopic(id: $id)
}
    `;

export function useDeletePrezentaTopicMutation() {
  return Urql.useMutation<DeletePrezentaTopicMutation, DeletePrezentaTopicMutationVariables>(DeletePrezentaTopicDocument);
};
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($options: UsernamePasswordInput!) {
  register(options: $options) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const CopiiDocument = gql`
    query Copii {
  copii {
    ...RegularCopil
  }
}
    ${RegularCopilFragmentDoc}`;

export function useCopiiQuery(options: Omit<Urql.UseQueryArgs<CopiiQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CopiiQuery>({ query: CopiiDocument, ...options });
};
export const CopilDocument = gql`
    query Copil($id: Int!) {
  copil(id: $id) {
    ...RegularCopil
  }
}
    ${RegularCopilFragmentDoc}`;

export function useCopilQuery(options: Omit<Urql.UseQueryArgs<CopilQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CopilQuery>({ query: CopilDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const PrezentaDocument = gql`
    query Prezenta($id: Int!) {
  prezenta(id: $id) {
    ...RegularPrezenta
  }
}
    ${RegularPrezentaFragmentDoc}`;

export function usePrezentaQuery(options: Omit<Urql.UseQueryArgs<PrezentaQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PrezentaQuery>({ query: PrezentaDocument, ...options });
};
export const PrezentaTopicDocument = gql`
    query PrezentaTopic($id: Int!) {
  prezentaTopic(id: $id) {
    ...RegularPrezentaTopic
  }
}
    ${RegularPrezentaTopicFragmentDoc}`;

export function usePrezentaTopicQuery(options: Omit<Urql.UseQueryArgs<PrezentaTopicQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PrezentaTopicQuery>({ query: PrezentaTopicDocument, ...options });
};
export const PrezenteDocument = gql`
    query Prezente {
  prezente {
    ...RegularPrezenta
  }
}
    ${RegularPrezentaFragmentDoc}`;

export function usePrezenteQuery(options: Omit<Urql.UseQueryArgs<PrezenteQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PrezenteQuery>({ query: PrezenteDocument, ...options });
};