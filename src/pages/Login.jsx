import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Button, Grid, Typography, Container } from "@material-ui/core";
import { Formik, Form, Field } from "formik";

import { TextField } from "formik-material-ui";

import * as Yup from "yup";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import links from "../constants/links";
import { jwt } from "../services/authentication";
import AuthContext from "../contexts/AuthContext";

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
}));

export default () => {
  const classes = useStyles();
  const { auth, setAuth } = useContext(AuthContext);

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
            onSubmit={(values, {setSubmitting}) => {
              setTimeout(() => {
                setSubmitting(false);
                alert(JSON.stringify(values, null, 2));
              }, 500);
            }}
          >
            {(formik) => (
              <Form>
                <Field
                  component={TextField}
                  fullWidth
                  name="email"
                  type="text"
                  label="Email"
                />
                <Field
                  component={TextField}
                  fullWidth
                  type="password"
                  label="Password"
                  name="password"
                />
                <Button
                  color="primary"
                  variant="contained"
                  disabled={formik.isSubmitting}
                  onClick={formik.submitForm}
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </Container>
    </div>
  );
};
