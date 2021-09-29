import { Checkbox } from "@chakra-ui/checkbox";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { useField } from "formik";
import React from "react";

// type CheckboxFieldProps = InputHTMLAttributes<HTMLInputElement> & {
//   label: string;
//   name: string;
// };

export const CheckboxField: React.FC<any> = ({ label, size: _, ...props }) => {
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <Checkbox {...field} {...props} id={field.name}>
        {label}
      </Checkbox>
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
