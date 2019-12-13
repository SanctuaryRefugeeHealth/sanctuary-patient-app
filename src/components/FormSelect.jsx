import React from "react";
import { Select, InputLabel, MenuItem, FormControl } from "@material-ui/core";
import { useField } from "react-final-form";

const FormSelect = ({ name, options, label, ...rest }) => {
  // meta can also be retrieved from useField if specific values are needed (eg. error)
  // (https://final-form.org/docs/react-final-form/types/FieldRenderProps)
  const { input } = useField(name);
  return (
    <FormControl>
      <InputLabel htmlFor="age-helper">Age</InputLabel>
      <Select {...rest} {...input} variant="outlined">
        {options.map(option => (
          <MenuItem value={option.value} key={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FormSelect;
