import { Button } from "@chakra-ui/button";
import { Checkbox } from "@chakra-ui/checkbox";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Box } from "@chakra-ui/layout";
import { Radio } from "@chakra-ui/radio";
import { Formik, Form, Field } from "formik";
import { withUrqlClient } from "next-urql";
import router from "next/router";
import React from "react";
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
              <label>
                <Field type="checkbox" name="prezent" />
                Prezent?
              </label>
              <br />
              <Button mt={2} mr="auto" type="submit" isLoading={isSubmitting}>
                Create
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(CreatePrezenta);
