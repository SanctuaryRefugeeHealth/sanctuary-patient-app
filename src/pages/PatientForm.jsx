import React from "react";
import Typography from "@material-ui/core/Typography";
import {Input, Select, MenuItem} from "@material-ui/core";
import { Form, Field } from 'react-final-form';
import { FormTextField, FormSelect } from '../components';

const languages = {
  ENGLISH: 1,
  ARABIC: 2,
  SPANISH: 3
};

var languageOptions = Object.keys(languages).map(function(key, value) {
  return <MenuItem value={value}>{key.charAt(0) + key.slice(1).toLowerCase()}</MenuItem>
});

const PatientForm = () => {
  return (
    <div>
      <Typography variant="h2" gutterBottom>Patient</Typography>
      <form id="patientForm">
        <Input type="text" placeholder="Name" />
        <Input type="text" placeholder="Phone Number" />
        <Select displayEmpty>
          <MenuItem value="" disabled>
            <em>None</em>
          </MenuItem>
          {languageOptions}
        </Select>
      </form>
    </div>
  );
}

export default PatientForm;