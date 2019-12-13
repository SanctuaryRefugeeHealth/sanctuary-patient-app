import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Input, Link, Checkbox, Typography, Stepper, Step, StepLabel, Button, Select, MenuItem, FormControl, InputLabel, FormHelperText, FormControlLabel } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { ContentSwitch } from "../components";
import MomentUtils from "@date-io/moment";

const useStyles = makeStyles(theme => ({
  button: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  }
}));

function getSteps() {
  return ["Patient Information", "Clinic Information", "Appointment Information"];
}

const NewAppointment = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();

  const isStepOptional = step => step === 3;
  const isStepSkipped = step => skipped.has(step);

  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(prevSkipped => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const languages = [
    {
      id: 1,
      iso: "en",
      name: "English",
      direction: "ltr"
    },
    {
      id: 2,
      iso: "ar",
      name: "Arabic",
      direction: "rtl"
    },
    {
      id: 3,
      iso: "es",
      name: "Spanish",
      direction: "ltr"
    }
  ];

  var languageOptions = languages.map(function(language) {
    return <MenuItem value={language.id}>{language.name}</MenuItem>
  });

  return (
    <>
      <Typography variant="h1" gutterBottom>Create an Appointment</Typography>
      <form id="new-appointment-form" noValidate autoComplete="off">
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div>
              {window.location = "/appointments"}
            </div>
          ) : (
            <div>
              <ContentSwitch index={activeStep}>
                <div>
                  <Typography variant="h2" gutterBottom>Patient</Typography>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="name" required>Name</InputLabel>
                    <Input id="name" required />
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="phone" required>Phone Number</InputLabel>
                    <Input id="phone" aria-describedby="phone-helper-text" required />
                    <FormHelperText id="phone-helper-text">In the format 123-123-1234</FormHelperText>
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="language-label" required>Language</InputLabel>
                    <Select displayEmpty id="language" labelId="language-label" required >
                      <MenuItem value={0} disabled>None</MenuItem>
                      {languageOptions}
                    </Select>
                  </FormControl>
                </div>
                <div>
                <Typography variant="h2" gutterBottom>Clinic</Typography>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="clinic-name" required>Clinic Name</InputLabel>
                        <Input id="clinic-name" required />
                    </FormControl>

                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="practitioner-name" required>Practitioner Name</InputLabel>
                        <Input id="practitioner-name" required />
                    </FormControl>

                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="address" required>Address</InputLabel>
                        <Input id="address" required />
                    </FormControl>

                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="phone" required>Phone Number</InputLabel>
                        <Input id="phone" aria-describedby="phone-helper-text" required />
                        <FormHelperText id="phone-helper-text">In the format 123-123-1234</FormHelperText>
                    </FormControl>
                </div>
                <div>
                  <Typography variant="h2" gutterBottom>
                    Appointment
                  </Typography>
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                    <FormControl className={classes.formControl}>
                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/DD/YYYY"
                        margin="normal"
                        label="Appointment Date"
                        value={selectedDate}
                        onChange={handleDateChange}
                        id="date"
                        KeyboardButtonProps={{
                          "aria-label": "change date"
                        }}
                        aria-describedby="date-helper-text"
                        required
                      />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                      <KeyboardTimePicker
                        margin="normal"
                        id="time"
                        label="Appointment Time"
                        KeyboardButtonProps={{
                          "aria-label": "change time"
                        }}
                        value={selectedDate}
                        onChange={handleDateChange}
                        aria-describedby="time-helper-text"
                        required
                      />
                    </FormControl>
                  </MuiPickersUtilsProvider>
                </div>
              </ContentSwitch>
              <div>
              {activeStep === 0 && (
                  <Link
                  href="/appointments"
                  className={classes.button}
                  >
                    CANCEL
                  </Link>
                )}
                {activeStep !== 0 && (
                  <Button
                  onClick={handleBack}
                  className={classes.button}
                >
                  Back
                </Button>
                )}
                {isStepOptional(activeStep) && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSkip}
                    className={classes.button}
                  >
                    Skip
                  </Button>
                )}
                {activeStep !== steps.length - 1 && (
                  <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                  type="button"
                  >
                  Next
                </Button>
                )}
                {activeStep === steps.length - 1 && (
                  <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                  type="submit"
                  form="new-appointment-form"
                  >
                  Create Appointment
                </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </form>
    </>
  );
};

export default NewAppointment;
