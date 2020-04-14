import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Stepper,
  Step,
  StepLabel,
  Paper,
} from "@material-ui/core";
import { ContentSwitch } from "../components";
import { FormPatient, FormClinic, FormAppointment, Buttons } from "../components/NewAppointment"
import { createAppointment } from "../services";
import links from "../constants/links";
import languages from "../constants/languages";

const initFormData = {
  patientName: "",
  patientPhoneNumber: "",
  patientLanguage: 0,
  practitionerClinicName: "",
  specialistName: "",
  practitionerPhoneNumber: "",
  location: "",
}

const NewAppointment = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [formData, setFormData] = useState(initFormData)
  const steps = ["Patient Information", "Clinic Information", "Appointment Information"];
  const stepLabels = steps.map((label, index) => {
    return (
      <Step key={label}>
        <StepLabel>{label}</StepLabel>
      </Step>
    );
  })

  // event handler
  const handle = action => ({
    changeText: e => setFormData({ ...formData, [e.target.id]: e.target.value }),
    changeDate: dt => setSelectedDate(dt),
    changeLanguage: e => setFormData({ ...formData, patientLanguage: languages[e.target.value - 1].id }),
    moveNext: _ => setActiveStep(step => step + 1),
    moveBack: _ => setActiveStep(step => step - 1),
    submit: e => {
      e.preventDefault();
      const convertMonth = str => {
        const months = {
          jan: '01', feb: '02', mar: '03', apr: '04', may: '05', jun: '06',
          jul: '07', aug: '08', sep: '09', oct: '10', nov: '11', dec: '12'
        }
        return months[str.substring(0, 3).toLowerCase()]
      }
      const changeDateFormat = (date) => {
        const tokens = date.toString().split(' ')
        const yyyy = tokens[3]
        const mm = convertMonth(tokens[1])
        const dd = tokens[2]
        const hhmmss = tokens[4]
        return `${yyyy}-${mm}-${dd} ${hhmmss}`
      }
      const formattedDate = changeDateFormat(selectedDate)
      createAppointment({ ...formData, date: formattedDate })
        .then(handle('moveNext')())
    },
  })[action]

  return (
    activeStep === steps.length ?
      <Redirect to={links.appointments} />
      :
      <div className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center" className={classes.title} gutterBottom>Create an Appointment</Typography>
          <form id="new-appointment-form" noValidate autoComplete="off" onSubmit={handle('submit')}>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {stepLabels}
            </Stepper>
            <ContentSwitch index={activeStep}>
              <FormPatient props={{ classes, formData, handle }} />
              <FormClinic props={{ classes, formData, handle }} />
              <FormAppointment props={{ classes, formData, selectedDate, handle }} />
            </ContentSwitch>
            <Buttons props={{ classes, activeStep, steps, handle }} />
          </form>
        </Paper>
      </div>
  );
};

// styles
const useStyles = makeStyles(theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      width: 700,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
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
    height: '48vh',
    padding: theme.spacing(2, 1, 9),
  },
  title: {
    fontSize: '1.5em',
    fontWeight: 600,
    color: '#2f3542',
    [theme.breakpoints.up("sm")]: {
      fontSize: '2.5em',
    }
  },
  subtitle: {
    padding: theme.spacing(1, 0, 0),
    fontSize: '1.2em',
    fontWeight: 600,
    color: '#57606f',
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(3, 0, 0),
      fontSize: '1.8em',
    }
  },
  textField: {
    '& *': {
      [theme.breakpoints.down("sm")]: {
        fontSize: '1em',
      }
    }
  },
  formControl: {
    marginRight: theme.spacing(3),
    minWidth: 120,
    '& *': {
      [theme.breakpoints.down("sm")]: {
        fontSize: '1em',
      }
    }
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginRight: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
  }
}));

export default NewAppointment;
