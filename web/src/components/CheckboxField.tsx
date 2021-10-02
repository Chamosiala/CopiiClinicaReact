import { Checkbox, CheckboxProps } from "@chakra-ui/checkbox";
import { FormControl, FormErrorMessage } from "@chakra-ui/form-control";
import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";

type CheckboxFieldProps = InputHTMLAttributes<HTMLInputElement> &
  CheckboxProps & {
    label: string;
    name: string;
  };

export const CheckboxField: React.FC<CheckboxFieldProps> = ({
  label,
  size: _,
  ...props
}) => {
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
