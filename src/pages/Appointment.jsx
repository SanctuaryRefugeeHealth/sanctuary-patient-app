import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import AppointmentDetails from "./AppointmentDetails";
import Messages from "./Messages";
import NewMessage from "./NewMessage";
import links from "../constants/links";
import { useHistory } from "react-router-dom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function SimpleTabs() {
  const history = useHistory();
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Box display="flex" justifyContent="space-between">
          <Button
            style={{ color: "white", marginRight: 10 }}
            onClick={() => history.push(links.appointments)}
          >
            {"< "}Back to Appointments
          </Button>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="Details" {...a11yProps(0)} />
            <Tab label="Messages" {...a11yProps(1)} />
          </Tabs>
        </Box>
      </AppBar>
      <TabPanel value={value} index={0}>
        <AppointmentDetails />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Messages />
      </TabPanel>
    </div>
  );
}
