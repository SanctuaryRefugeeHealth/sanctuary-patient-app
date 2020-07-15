import React from "react";
import { Snackbar } from "@material-ui/core";

import MuiAlert from "@material-ui/lab/Alert";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

export default (props) => {
  return (
    <Snackbar open={props.open} autoHideDuration={6000} onClose={props.onClose}>
      <Alert onClose={props.onClose} severity="error">
        {props.message}
      </Alert>
    </Snackbar>
  );
};
