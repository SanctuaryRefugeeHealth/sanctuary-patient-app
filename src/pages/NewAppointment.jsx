import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Input, Checkbox, Typography, Stepper, Step, StepLabel, Button, Select, MenuItem, FormControl, InputLabel, FormHelperText, FormControlLabel } from "@material-ui/core";
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
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(prevSkipped => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => setActiveStep(0);

  const languages = {
    ENGLISH: 1,
    ARABIC: 2,
    SPANISH: 3
  };

  var languageOptions = Object.keys(languages).map(function(key, value) {
    return <MenuItem value={value}>{key.charAt(0) + key.slice(1).toLowerCase()}</MenuItem>
  });

  return (
    <>
      <Typography variant="h1" gutterBottom>Create an Appointment</Typography>
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
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div>
            <ContentSwitch index={activeStep}>
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
              <div>
                <Typography variant="h2" gutterBottom>Clinic</Typography>
                <form id="clinicForm" noValidate autoComplete="off">
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="clinic-name">Clinic Name</InputLabel>
                        <Input id="clinic-name" />
                    </FormControl>

                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="practitioner-name">Practitioner Name</InputLabel>
                        <Input id="practitioner-name" />
                    </FormControl>

                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="address">Address</InputLabel>
                        <Input id="address" />
                    </FormControl>

                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="phone">Phone Number</InputLabel>
                        <Input id="phone" aria-describedby="phone-helper-text" />
                        <FormHelperText id="phone-helper-text">In the format 123-123-1234</FormHelperText>
                    </FormControl>
                </form>
              </div>
              <div>
                <Typography variant="h2" gutterBottom>
                  Appointment
                </Typography>
                <form id="appointmentForm">
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
                      />
                    </FormControl>
                  </MuiPickersUtilsProvider>

                  <FormControl className={classes.formControl}>
                    <InputLabel id="template-label">Template</InputLabel>
                    <Select displayEmpty id="template" labelId="template-label">
                      <MenuItem value="" disabled>
                        None
                      </MenuItem>
                      <MenuItem value="1">Template 1</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl className={classes.formControl}>
                      <FormControlLabel
                          control={
                          <Checkbox
                              id="additional-information"
                              color="primary"
                          />
                          }
                          label="Additional Information"
                      />
                  </FormControl>

                  <FormControl className={classes.formControl}>
                  <FormControlLabel
                          control={
                          <Checkbox
                              id="interpretor-required"
                              color="primary"
                          />
                          }
                          label="Interpretor"
                      />
                  </FormControl>
                </form>
              </div>
            </ContentSwitch>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button>
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

              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
                type="submit"
                form={activeStep}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default NewAppointment;
