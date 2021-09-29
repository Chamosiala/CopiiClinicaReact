import { Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { useCreateCopilMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { toErrorMap } from "../utils/toErrorMap";
import { useIsAuth } from "../utils/useIsAuth";

interface createCopilProps {}

const createCopil: React.FC<createCopilProps> = ({}) => {
  const [, createCopil] = useCreateCopilMutation();
  const router = useRouter();
  useIsAuth();
  return (
    <Layout variant="small">
      <Formik
        initialValues={{ nume: "", prenume: "", varsta: null }}
        onSubmit={async (values, { setErrors }) => {
          if (values.varsta === null) {
            setErrors({ varsta: "Introdu o varsta" });
          } else {
            const response = await createCopil({ input: values as any });
            if (response.data?.createCopil.errors) {
              setErrors(toErrorMap(response.data.createCopil.errors));
            } else {
              router.push("/copii");
            }
            console.log(response.data?.createCopil.copil);
          }
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
              Adauga
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(createCopil);
