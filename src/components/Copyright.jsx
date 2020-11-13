import React from "react";
import { Link, Typography } from "@material-ui/core";

export default () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://sanctuaryrefugee.ca/">
        Sanctuary Refugee Health Centre
      </Link>
      {" 2020"}
    </Typography>
  );
};
