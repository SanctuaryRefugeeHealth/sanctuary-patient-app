import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Button,
  Typography,
  Grid,
  Container,
} from "@material-ui/core";
import { Formik, Form, Field } from "formik";

import { TextField } from "formik-material-ui";

import * as Yup from "yup";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import links from "../constants/links";
import { jwt } from "../services/authentication";
import AuthContext from "../contexts/AuthContext";
import Snackbar from "../components/Snackbar";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(10),
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  item: {
      height: "100px"
  }
}));

export default () => {
  const classes = useStyles();
  const { auth, setAuth } = useContext(AuthContext);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return auth.state === "login" ? (
    <Redirect to={links.appointments} />
  ) : (
    <div className={classes.root}>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={Yup.object({
              email: Yup.string().email().required("required"),
              password: Yup.string().required("required"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              jwt.login(values).then(
                (data) => {
                  console.log(data);
                  setAuth({ state: data.state });
                },
                (status) => {
                  setSubmitting(false);
                  switch (status) {
                    case 401:
                      setSnackbarMessage("Incorrect email or password");
                      setSnackbarOpen(true);
                      break;
                    default:
                      setSnackbarMessage("Problem logging in");
                      setSnackbarOpen(true);
                      break;
                  }
                }
              );
            }}
          >
            {({ submitForm, isSubmitting }) => (
              <Form onsubmit={submitForm}>
                <Grid container spacing={3}>
                  <Grid item xs={12} className={classes.item}>
                    <Field
                      component={TextField}
                      fullWidth
                      name="email"
                      type="text"
                      label="Email"
                    />
                  </Grid>
                  <Grid item xs={12} className={classes.item}>
                    <Field
                      component={TextField}
                      fullWidth
                      type="password"
                      label="Password"
                      name="password"
                    />
                  </Grid>
                  <Grid item xs={12} className={classes.item}>
                    <Button
                      color="primary"
                      fullWidth
                      variant="contained"
                      disabled={isSubmitting}
                      type="submit"
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </div>
      </Container>
      <Snackbar
        open={snackbarOpen}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </div>
  );
};
