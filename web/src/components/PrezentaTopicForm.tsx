import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import { Form, Formik } from "formik";
import React from "react";
import { useCreatePrezentaTopicMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { InputField } from "./InputField";

interface PrezentaTopicFormProps {
  prezentaId: number;
  tip: string;
}

export const PrezentaTopicForm: React.FC<PrezentaTopicFormProps> = ({
  prezentaId,
  tip,
}) => {
  const [, createPrezentaTopic] = useCreatePrezentaTopicMutation();
  return (
    <Formik
      initialValues={{ titlu: "", detalii: "" }}
      onSubmit={async (values, { setErrors }) => {
        const response = await createPrezentaTopic({
          prezentaId,
          tip,
          input: values,
        });
        if (response.data?.createPrezentaTopic.errors) {
          setErrors(toErrorMap(response.data.createPrezentaTopic.errors));
        } else {
          // router.reload();
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Box>
            <InputField name="titlu" label="Titlu" placeholder="titlu" />
            <InputField
              name="detalii"
              label="Detalii"
              placeholder="detalii"
              type="textarea"
            />
            <Button mt={2} mr="auto" type="submit" isLoading={isSubmitting}>
              Create
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};
