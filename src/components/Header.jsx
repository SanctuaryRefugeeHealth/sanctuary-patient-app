import React, { useContext } from "react";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Link,
  Button,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { jwt } from "../services/authentication";
import AuthContext from "../contexts/AuthContext";

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    flexGrow: 1,
    fontWeight: 700,
    color: "#273c75",
  },
  link: {
    margin: theme.spacing(1, 1.5),
    fontWeight: 700,
    color: "#273c75",
    fontSize: "0.9em",
    [theme.breakpoints.up("sm")]: {
      fontSize: "1em",
    },
  },
}));

export default () => {
  const classes = useStyles();
  const { auth, setAuth } = useContext(AuthContext);
  const handleClick = (e) =>
    jwt.logout().then((data) => {
      setAuth({ state: data.state, timeout: data.timeout });
    });

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      className={classes.appBar}
    >
      <Toolbar className={classes.toolbar}>
        <Typography
          variant="h6"
          color="inherit"
          noWrap
          className={classes.toolbarTitle}
        >
          <Link href="/" underline="none">
            Sanctuary Patient App
          </Link>
        </Typography>
        {auth.state === "login" && (
          <React.Fragment>
            <nav>
              <Link
                variant="button"
                color="textPrimary"
                href="/appointments"
                className={classes.link}
              >
                Appointments
              </Link>
            </nav>
            <Button
              href="#"
              color="primary"
              variant="outlined"
              className={classes.link}
              onClick={handleClick}
            >
              Logout
            </Button>
          </React.Fragment>
        )}
      </Toolbar>
    </AppBar>
  );
};
