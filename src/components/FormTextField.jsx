import React from "react";
import { useField } from "react-final-form";
import { TextField } from "@material-ui/core";

const FormTextField = ({ name, useFieldConfig, ...rest }) => {
  const { input, meta } = useField(name, useFieldConfig);

  return (
    <TextField
      error={!!meta.error}
      errorText={meta.error}
      {...input}
      {...rest}
    />
  );
};

export default FormTextField;
