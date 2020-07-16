import React from "react";
import { makeStyles } from "@material-ui/core/styles";

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
  content: {
    height: "42vh",
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
    fontSize: "1.2em",
    fontWeight: 600,
    color: "#57606f",
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.8em",
    },
  },
}));

export default function NotFound() {
  const classes = useStyles();
  return (
    <div className={classes.layout}>
      <Paper className={classes.paper}>
        <Typography
          variant="h4"
          align="center"
          className={classes.title}
          gutterBottom
        >
          404 Not Found
        </Typography>
        <Typography
          variant="h6"
          align="center"
          className={classes.subtitle}
          gutterBottom
        >
          The page you have requested could not be found.
        </Typography>
      </Paper>
    </div>
  );
}
