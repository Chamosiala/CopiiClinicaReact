import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { InputField } from "../../../components/InputField";
import { Layout } from "../../../components/Layout";
import {
  useCreateCopilMutation,
  useUpdateCopilMutation,
} from "../../../generated/graphql";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { toErrorMap } from "../../../utils/toErrorMap";
import { useGetCopilFromUrl } from "../../../utils/useGetCopilFromUrl";
import { useIsAuth } from "../../../utils/useIsAuth";

interface createCopilProps {}

const createCopil: React.FC<createCopilProps> = ({}) => {
  // const [, createCopil] = useCreateCopilMutation();
  const [{ data, error, fetching }] = useGetCopilFromUrl();
  const [, updateCopil] = useUpdateCopilMutation();
  const router = useRouter();
  useIsAuth();

  if (fetching) {
    return (
      <Layout>
        <div>loading...</div>
      </Layout>
    );
  }

  if (!data?.copil) {
    return (
      <Layout>
        <Box>Copilul nu exista</Box>
      </Layout>
    );
  }

  return (
    <Layout variant="small">
      <Formik
        initialValues={{
          nume: data.copil.nume,
          prenume: data.copil.prenume,
          varsta: data.copil.varsta,
        }}
        onSubmit={async (values) => {
          await updateCopil({ id: data.copil!.id, ...values });
          router.push("/copii");
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="nume" label="Nume" placeholder="nume" />
            <InputField name="prenume" label="Prenume" placeholder="prenume" />
            <InputField
              name="varsta"
              label="Varsta"
              placeholder="varsta"
              type="number"
            />
            <Button
              colorScheme="orange"
              mt={4}
              type="submit"
              isLoading={isSubmitting}
            >
              Update
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(createCopil);
