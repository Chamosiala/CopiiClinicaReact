import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import { Field, Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import router from "next/router";
import React from "react";
import { CheckboxField } from "../../components/CheckboxField";
import { InputField } from "../../components/InputField";
import { Layout } from "../../components/Layout";
import { useCreatePrezentaMutation } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { toErrorMap } from "../../utils/toErrorMap";
import { useGetIntId } from "../../utils/useGetIntId";

export const CreatePrezenta = ({}) => {
  const intId = useGetIntId();
  const [, createPrezenta] = useCreatePrezentaMutation();

  return (
    <Layout variant="small">
      <Formik
        initialValues={{ data: "", prezent: false }}
        onSubmit={async (values, { setErrors }) => {
          const response = await createPrezenta({
            copilId: intId,
            input: {
              data: values.data,
              // prezent: values.prezent === "prezent" ? true : false,
              prezent: values.prezent,
            },
          });
          if (response.data?.createPrezenta.errors) {
            setErrors(toErrorMap(response.data.createPrezenta.errors));
          } else {
            router.push(`/copil/${intId}`);
          }
          console.log(response.data?.createPrezenta.prezenta);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box>
              <InputField
                name="data"
                label="Data"
                placeholder="data"
                type="datetime-local"
              />
              <CheckboxField
                mt={4}
                defaultIsChecked
                name="prezent"
                label="Prezent?"
              />
              <Button
                colorScheme="orange"
                mt={4}
                mr="auto"
                type="submit"
                isLoading={isSubmitting}
              >
                Adauga
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(CreatePrezenta);
