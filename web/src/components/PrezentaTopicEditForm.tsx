import { Button } from "@chakra-ui/button";
import { Box, Flex } from "@chakra-ui/layout";
import { Form, Formik } from "formik";
import React from "react";
import {
  PrezentaTopic,
  useUpdatePrezentaTopicMutation,
} from "../generated/graphql";
import { InputField } from "./InputField";
import { TextareaField } from "./TextareaField";

interface PrezentaTopicEditFormProps {
  prezentaTopic: PrezentaTopic;
  closeForm: VoidFunction;
}

export const PrezentaTopicEditForm: React.FC<PrezentaTopicEditFormProps> = ({
  prezentaTopic,
  closeForm: closeForm,
}) => {
  const [, updatePrezentaTopic] = useUpdatePrezentaTopicMutation();

  return (
    <Formik
      initialValues={{
        titlu: prezentaTopic.titlu,
        detalii: prezentaTopic.detalii,
      }}
      onSubmit={async (values) => {
        await updatePrezentaTopic({
          id: prezentaTopic.id,
          ...values,
        });
        closeForm();
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Box w="392px" borderWidth="1px" p={5} mr="40px">
            <InputField name="titlu" label="Titlu" placeholder="titlu" />
            <TextareaField
              name="detalii"
              label="Detalii"
              placeholder="detalii"
              mt={2}
            />
            <Flex className="prezentaTopicEditButtons">
              <Button
                colorScheme="orange"
                mt={2}
                type="submit"
                isLoading={isSubmitting}
              >
                Update
              </Button>
              <Button
                onClick={() => {
                  closeForm();
                }}
                colorScheme="red"
                mt={2}
                ml="auto"
              >
                Cancel
              </Button>
            </Flex>
          </Box>
        </Form>
      )}
    </Formik>
  );
};
