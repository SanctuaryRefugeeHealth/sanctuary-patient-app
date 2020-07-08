import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { ErrorMessage, Field, Form, Formik } from "formik";

import * as Yup from "yup";

import {
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  FormControl,
  Paper,
  MenuItem,
  Grid,
} from "@material-ui/core";

import { MuiPickersUtilsProvider } from "@material-ui/pickers";

import { TextField } from "formik-material-ui";

import {
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "formik-material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";

import languages from "../constants/languages";

const AppointmentForm = ({ children, initialValues, onSubmit }) => {
  const classes = useStyles();
  const [activeStep, setactiveStep] = useState(0);
  const steps = React.Children.toArray(children);
  const [formData, setFormData] = useState(initialValues);

  const stepsText = [
    "Patient Information",
    "Clinic Information",
    "Appointment Information",
  ];

  const stepLabels = stepsText.map((label) => {
    return (
      <Step key={label}>
        <StepLabel>{label}</StepLabel>
      </Step>
    );
  });

  const step = steps[activeStep];
  const totalSteps = steps.length;
  const isLastStep = activeStep === totalSteps - 1;

  const next = (values) => {
    setFormData(values);
    setactiveStep(Math.min(activeStep + 1, totalSteps - 1));
  };

  const previous = (values) => {
    setFormData(values);
    setactiveStep(Math.max(activeStep - 1, 0));
  };

  const handleSubmit = async (values, bag) => {
    if (step.props.onSubmit) {
      await step.props.onSubmit(values, bag);
    }
    if (isLastStep) {
      return onSubmit(values, bag);
    } else {
      bag.setTouched({});
      next(values);
    }
  };

  return (
    <Formik
      initialValues={formData}
      onSubmit={handleSubmit}
      validationSchema={step.props.validationSchema}
    >
      {(formik) => (
        <Form>
          <Typography
            variant="h4"
            align="center"
            className={classes.title}
            gutterBottom
          >
            Create an Appointment
          </Typography>
          <Stepper activeStep={activeStep}>{stepLabels}</Stepper>
          {step}
          <div className={classes.buttons}>
            {activeStep > 0 && (
              <Button onClick={() => previous(formik.values)} type="button">
                Back
              </Button>
            )}
            <Button
              color="primary"
              variant="contained"
              disabled={formik.isSubmitting}
              type="submit"
            >
              {isLastStep ? "Submit" : "Next"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const AppointmentFormStep = ({ children }) => children;

const NewAppointment = () => {
  const classes = useStyles();

  const languageOptions = languages.map((language) => {
    return (
      <MenuItem
        value={language.name.toLowerCase()}
        key={language.name.toLowerCase()}
      >
        {language.name}
      </MenuItem>
    );
  });

  return (
    <div className={classes.layout}>
      <Paper className={classes.paper}>
        <AppointmentForm
          initialValues={{
            patientName: "",
            patientPhoneNumber: "",
            patientLanguage: "english",
            practitionerClinicName: "",
            specialistName: "",
            practitionerPhoneNumber: "",
            location: "",
            appointmentDate: new Date(),
            appointmentTime: new Date(),
          }}
          onSubmit={async (values) =>
            console.log("AppointmentForm submit", values)
          }
        >
          <AppointmentFormStep
            validationSchema={Yup.object({
              patientName: Yup.string().required("required"),
              patientPhoneNumber: Yup.string().required("required"),
              patientLanguage: Yup.string().required("required"),
            })}
          >
            <Typography variant="h6" gutterBottom>
              Patient
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={6} sm={4}>
                <Field
                  component={TextField}
                  id="patientName"
                  name="patientName"
                  label="Patient Name"
                  type="text"
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <Field
                  component={TextField}
                  id="patientPhoneNumber"
                  name="patientPhoneNumber"
                  label="Phone Number"
                  type="text"
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <FormControl className={classes.formControl} fullWidth>
                  <Field
                    component={TextField}
                    id="patientLanguage"
                    name="patientLanguage"
                    label="Language"
                    select
                  >
                    {languageOptions}
                  </Field>
                </FormControl>
              </Grid>
            </Grid>
          </AppointmentFormStep>
          <AppointmentFormStep
            validationSchema={Yup.object({
              practitionerClinicName: Yup.string().required("required"),
              specialistName: Yup.string().required("required"),
              practitionerPhoneNumber: Yup.string().required("required"),
              location: Yup.string().required("required"),
            })}
          >
            <Typography variant="h6" gutterBottom>
              Clinic
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={6} sm={4}>
                <Field
                  component={TextField}
                  id="practitionerClinicName"
                  name="practitionerClinicName"
                  label="Clinic Name"
                  type="text"
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <Field
                  component={TextField}
                  id="specialistName"
                  name="specialistName"
                  label="Specialist Name"
                  type="text"
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <Field
                  component={TextField}
                  id="practitionerPhoneNumber"
                  name="practitionerPhoneNumber"
                  label="Phone Number"
                  type="text"
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  id="location"
                  name="location"
                  label="Address"
                  type="text"
                />
              </Grid>
            </Grid>
          </AppointmentFormStep>
          <AppointmentFormStep>
            <Typography variant="h6" className={classes.subtitle} gutterBottom>
              Patient
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={4} sm={4}>
                <Typography className={classes.textField} gutterBottom>
                  a
                </Typography>
              </Grid>
              <Grid item xs={4} sm={4}>
                <Typography className={classes.textField} gutterBottom>
                  b
                </Typography>
              </Grid>
              <Grid item xs={4} sm={4}>
                <Typography className={classes.textField} gutterBottom>
                  c
                </Typography>
              </Grid>
            </Grid>

            <Typography variant="h6" className={classes.subtitle} gutterBottom>
              Clinic
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={4} sm={4}>
                <Typography className={classes.textField}>d</Typography>
              </Grid>
              <Grid item xs={4} sm={4}>
                <Typography className={classes.textField}>e</Typography>
              </Grid>
              <Grid item xs={4} sm={4}>
                <Typography className={classes.textField}>f</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography className={classes.textField} gutterBottom>
                  g
                </Typography>
              </Grid>

              <Typography
                variant="h6"
                className={classes.subtitle}
                gutterBottom
              >
                Appointment
              </Typography>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container spacing={1}>
                  <Grid item xs={6} sm={6}>
                    <FormControl className={classes.formControl} fullWidth>
                      <Field
                        component={KeyboardDatePicker}
                        id="appointmentDate"
                        format="MM/dd/yyyy"
                        name="appointmentDate"
                        label="Appointment Date"
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <FormControl className={classes.formControl} fullWidth>
                      <Field
                        component={KeyboardTimePicker}
                        id="appointmentTime"
                        name="appointmentTime"
                        label="Appointment Time"
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </MuiPickersUtilsProvider>
            </Grid>
          </AppointmentFormStep>
        </AppointmentForm>
      </Paper>
    </div>
  );
};

// styles
const useStyles = makeStyles((theme) => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      width: 700,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(12),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 3),
  },
  content: {
    height: "48vh",
    padding: theme.spacing(2, 1, 9),
  },
  title: {
    fontSize: "1.5em",
    fontWeight: 600,
    color: "#2f3542",
    [theme.breakpoints.up("sm")]: {
      fontSize: "2.5em",
    },
  },
  subtitle: {
    padding: theme.spacing(1, 0, 0),
    fontSize: "1.2em",
    fontWeight: 600,
    color: "#57606f",
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(3, 0, 0),
      fontSize: "1.8em",
    },
  },
  textField: {
    "& *": {
      [theme.breakpoints.down("sm")]: {
        fontSize: "1em",
      },
    },
  },
  formControl: {
    marginRight: theme.spacing(3),
    minWidth: 120,
    "& *": {
      [theme.breakpoints.down("sm")]: {
        fontSize: "1em",
      },
    },
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginRight: theme.spacing(2),
    display: "flex",
    alignItems: "center",
  },
}));

export default NewAppointment;
