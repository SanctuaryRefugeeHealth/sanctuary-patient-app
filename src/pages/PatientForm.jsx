import React from "react";
import Typography from "@material-ui/core/Typography";
import { Form, Field } from 'react-final-form';
import { FormTextField, FormSelect } from '../components';

const languages = {
  ENGLISH: 1,
  ARABIC: 2,
  SPANISH: 3
};

var languageOptions = Object.keys(languages).map(function(key, value) {
  return <option value={value}>{key.charAt(0) + key.slice(1).toLowerCase()}</option>
});

const PatientForm = () => {
  return (
    <div>
      <Typography variant="h2" gutterBottom>Patient</Typography>
      <form id="patientForm">
        <input type="text" placeholder="Name" />
        <input type="text" placeholder="Phone Number" />
        <select>
          {languageOptions}
        </select>
      </form>
    </div>
  );
}

export default PatientForm;