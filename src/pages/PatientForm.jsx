import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';
import {Input, Select, MenuItem, FormControl, InputLabel, FormHelperText} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const languages = {
  ENGLISH: 1,
  ARABIC: 2,
  SPANISH: 3
};

var languageOptions = Object.keys(languages).map(function(key, value) {
  return <MenuItem value={value}>{key.charAt(0) + key.slice(1).toLowerCase()}</MenuItem>
});

const PatientForm = () => {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="h2" gutterBottom>Patient</Typography>
      <form id="patientForm" noValidate autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="name">Name</InputLabel>
          <Input id="name" />
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="phone">Phone Number</InputLabel>
          <Input id="phone" aria-describedby="phone-helper-text" />
          <FormHelperText id="phone-helper-text">In the format 123-123-1234</FormHelperText>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel id="language-label">Language</InputLabel>
          <Select displayEmpty id="language" labelId="language-label">
            <MenuItem value="" disabled>None</MenuItem>
            {languageOptions}
          </Select>
        </FormControl>
      </form>
    </div>
  );
}

export default PatientForm;