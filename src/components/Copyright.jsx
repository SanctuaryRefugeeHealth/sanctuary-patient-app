import React from "react";
import { Link, Typography } from "@material-ui/core";

export default () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://family-medicine.ca/">
        Center for Family Medicine
      </Link>
      {" 2024"}
    </Typography>
  );
};
