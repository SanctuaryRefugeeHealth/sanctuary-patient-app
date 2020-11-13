import React, { useState, useEffect } from "react";

import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import { Field, Form, Formik } from "formik";

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

import links from "../constants/links";
import { createAppointment, getLanguages } from "../services";
import Snackbar from "../components/Snackbar";

import { formatPhoneNumber, formatDate, formatTime } from "../utils/format";

const AppointmentForm = ({ children, initialValues, onSubmit }) => {
  const classes = useStyles();
  const [activeStep, setactiveStep] = useState(0);
  const steps = React.Children.toArray(children);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [formData, setFormData] = useState(initialValues);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const stepsText = ["Patient Information", "Appointment Information"];

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
    setactiveStep(Math.min(activeStep + 1, totalSteps));
  };

  const previous = (values) => {
    setFormData(values);
    setactiveStep(Math.max(activeStep - 1, 0));
  };

  const handleSubmit = async (values) => {
    try {
      if (step.props.onSubmit) {
        await step.props.onSubmit(values);
      }
      if (isLastStep) {
        await onSubmit(values);
      }
      next(values);
    } catch (error) {
      setSnackbarMessage(error);
      setSnackbarOpen(true);
    }
  };

  return activeStep === totalSteps ? (
    <Redirect to={links.appointments} />
  ) : (
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
          <Snackbar
            open={snackbarOpen}
            onClose={handleCloseSnackbar}
            message={snackbarMessage}
          />
        </Form>
      )}
    </Formik>
  );
};

const AppointmentFormStep = ({ children }) => children;

const NewAppointment = () => {
  const classes = useStyles();

  const initialValues = {
    patientName: "",
    patientPhoneNumber: "",
    patientLanguage: "English",
    practitionerAddress: "",
    appointmentDate: new Date(),
    appointmentTime: null,
    description: null,
    specialNotes: null,
  };

  const formatLanguageOptions = (languages) => {
    return languages.map((language) => {
      return (
        <MenuItem value={language.name} key={language.name}>
          {language.name}
        </MenuItem>
      );
    });
  };

  const [formData, setFormData] = useState(initialValues);
  const [languageOptions, setLanguageOptions] = useState(
    formatLanguageOptions([{ name: "English" }])
  );

  useEffect(() => {
    const loadLanguages = async () => {
      const languages = await getLanguages();
      setLanguageOptions(formatLanguageOptions(languages));
    };
    loadLanguages();
  }, []);

  return (
    <div className={classes.layout}>
      <Paper className={classes.paper}>
        <AppointmentForm
          initialValues={initialValues}
          onSubmit={async (values) => {
            const appointmentDate = formatDate(values.appointmentDate);
            const appointmentTime = formatTime(values.appointmentTime);

            const appointment = {
              ...values,
              date: `${appointmentDate} ${appointmentTime}`,
            };

            delete appointment.appointmentDate;
            delete appointment.appointmentTime;

            await createAppointment(appointment);
          }}
        >
          <AppointmentFormStep
            onSubmit={async (values) => {
              setFormData(values);
            }}
            validationSchema={Yup.object({
              patientName: Yup.string().required("required"),
              patientPhoneNumber: Yup.string()
                .matches(/\d+/, "phone number must only contain numbers")
                .length(10, "phone number must be 10 digits long")
                .required("required"),
              patientLanguage: Yup.string().required("required"),
            })}
          >
            <div className={classes.content}>
              <Typography
                variant="h6"
                className={classes.subtitle}
                gutterBottom
              >
                Patient
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={6} sm={4}>
                  <Field
                    component={TextField}
                    fullWidth
                    id="patientName"
                    name="patientName"
                    label="Patient Name"
                    type="text"
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Field
                    component={TextField}
                    fullWidth
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
            </div>
          </AppointmentFormStep>
          <AppointmentFormStep
            validationSchema={Yup.object({
              appointmentDate: Yup.date().required("required").nullable(),
              appointmentTime: Yup.date().required("required").nullable(),
              practitionerAddress: Yup.string().required("required"),
            })}
          >
            <div className={classes.content}>
              <Typography
                variant="h6"
                className={classes.subtitle}
                gutterBottom
              >
                Patient
              </Typography>
              <Grid container spacing={1}>
                <Grid item xs={4} sm={4}>
                  <Typography className={classes.textField} gutterBottom>
                    {formData.patientName}
                  </Typography>
                </Grid>
                <Grid item xs={4} sm={4}>
                  <Typography className={classes.textField} gutterBottom>
                    {formatPhoneNumber(formData.patientPhoneNumber)}
                  </Typography>
                </Grid>
                <Grid item xs={4} sm={4}>
                  <Typography className={classes.textField} gutterBottom>
                    {formData.patientLanguage}
                  </Typography>
                </Grid>
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
                  <Grid item xs={12}>
                    <Field
                      component={TextField}
                      fullWidth
                      id="description"
                      name="description"
                      label="Description"
                      type="text"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      component={TextField}
                      fullWidth
                      id="practitionerAddress"
                      name="practitionerAddress"
                      label="Address"
                      type="text"
                    />
                  </Grid>
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
                        minutesStep={5}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      component={TextField}
                      fullWidth
                      id="specialNotes"
                      name="specialNotes"
                      label="Special Notes"
                      type="text"
                    />
                  </Grid>
                </Grid>
              </MuiPickersUtilsProvider>
            </div>
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
    minHeight: "42vh",
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
