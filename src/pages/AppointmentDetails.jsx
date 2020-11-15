import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  CircularProgress,
  Typography,
  Paper,
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@material-ui/core/";
import {
  getAppointment,
  updateAppointmentConfirmed,
  updateInterpreterRequested,
  deleteAppointment,
  getResponseText,
} from "../services/appointments";
import { formatDatetime, formatPhoneNumber } from "../utils/format";

const useStyles = makeStyles((theme) => ({
  layout: {
    [theme.breakpoints.up("sm")]: {
      width: 700,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    padding: theme.spacing(1, 0, 1, 1),
    textTransform: "capitalize",
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(1),
      padding: theme.spacing(3),
    },
  },
  title: {
    marginTop: theme.spacing(1),
    fontSize: "1.5em",
    fontWeight: 600,
    color: "#2f3542",
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(0),
      fontSize: "2em",
    },
  },
  subtitle: {
    padding: theme.spacing(3, 0, 0),
    fontSize: "1em",
    fontWeight: 600,
    color: "#57606f",
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.3em",
    },
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    margin: theme.spacing(0, 4, 0),
    fontWeight: 400,
    color: "#57606f",
    "& *": {
      fontSize: "0.8em",
      [theme.breakpoints.up("sm")]: {
        fontSize: "1em",
      },
    },
  },
  buttons: {
    marginTop: theme.spacing(4),
    display: "flex",
    justifyContent: "center",
  },
  button: {
    margin: theme.spacing(0, 2),
    display: "flex",
    alignItems: "center",
  },
}));

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const [appointment, setAppointment] = useState();
  const [alert, setAlert] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();
  const appointmentId = location.pathname.split("/").pop();

  const handleAlert = () => setAlert(true);
  const handleClose = () => setAlert(false);

  const setConfirm = (confirmed) => {
    updateAppointmentConfirmed(appointmentId, confirmed).then(
      setAppointment({ ...appointment, appointmentIsConfirmed: confirmed })
    );
  };

  const handleConfirm = () => setConfirm(true);
  const handleUnconfirm = () => setConfirm(false);

  const setInterpreter = (interpreterRequested) => {
    updateInterpreterRequested(appointmentId, interpreterRequested).then(
      setAppointment({ ...appointment, translator: interpreterRequested })
    );
  };

  const handleInterpreter = () => setInterpreter(true);
  const handleCancelInterpreter = () => setInterpreter(false);

  const handleDelete = () => {
    deleteAppointment(appointmentId).then(() => history.push(`/appointments`));
  };

  useEffect(() => {
    const getData = async () => {
      const appointment = await getAppointment(appointmentId);
      appointment.response = getResponseText(
        appointment.appointmentIsConfirmed
      );
      setAppointment(appointment);
    };
    getData();
  }, [appointmentId]);

  return !appointment ? (
    <CircularProgress />
  ) : (
    <div className={classes.layout}>
      <Paper className={classes.paper}>
        <Typography
          variant="h4"
          align="center"
          className={classes.title}
          gutterBottom
        >
          Appointment Detail
        </Typography>

        <Typography variant="h6" className={classes.subtitle} gutterBottom>
          Patient
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={12} className={classes.row}>
            <Typography gutterBottom>Name</Typography>
            <Typography gutterBottom>{appointment.patientName}</Typography>
          </Grid>
          <Grid item xs={12} className={classes.row}>
            <Typography gutterBottom>Language</Typography>
            <Typography gutterBottom>{appointment.patientLanguage}</Typography>
          </Grid>
          <Grid item xs={12} className={classes.row}>
            <Typography gutterBottom>Phone</Typography>
            <Typography gutterBottom>
              {formatPhoneNumber(appointment.patientPhoneNumber)}
            </Typography>
          </Grid>
        </Grid>

        <Typography variant="h6" className={classes.subtitle} gutterBottom>
          Appointment
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={12} className={classes.row}>
            <Typography gutterBottom>Description</Typography>
            <Typography gutterBottom>{appointment.description}</Typography>
          </Grid>
          <Grid item xs={12} className={classes.row}>
            <Typography gutterBottom>Address</Typography>
            <Typography gutterBottom>
              {appointment.practitionerAddress}
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.row}>
            <Typography gutterBottom>Date</Typography>
            <Typography gutterBottom>
              {formatDatetime(appointment.appointmentTime)}
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.row}>
            <Typography gutterBottom>Response</Typography>
            <Typography gutterBottom>{appointment.response}</Typography>
          </Grid>
          <Grid item xs={12} className={classes.row}>
            <Typography gutterBottom>Interpreter Requested</Typography>
            <Typography gutterBottom>
              {appointment.translator ? "Yes" : "No"}
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.row}>
            <Typography gutterBottom>Special Notes</Typography>
            <Typography gutterBottom>{appointment.specialNotes}</Typography>
          </Grid>
        </Grid>
      </Paper>
      <div className={classes.buttons}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleConfirm}
          className={classes.button}
          type="button"
          disabled={appointment.appointmentIsConfirmed}
        >
          Confirm
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleUnconfirm}
          className={classes.button}
          type="button"
          disabled={appointment.appointmentIsConfirmed === false}
        >
          Decline
        </Button>
        {appointment.translator ? (
          <Button
            variant="contained"
            color="primary"
            onClick={handleCancelInterpreter}
            className={classes.button}
            type="button"
          >
            Cancel Interpreter
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={handleInterpreter}
            className={classes.button}
            type="button"
          >
            Request Interpreter
          </Button>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={handleAlert}
          className={classes.button}
          type="button"
        >
          Delete
        </Button>
      </div>

      <Dialog
        open={alert}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you certain you want to delete?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
