import React from "react";
import theme from "./constants/theme";
import { MuiThemeProvider } from "@material-ui/core/styles";
import links from "./constants/links";
import Appointment from "./pages/Appointment";
import Appointments from "./pages/Appointments";
import NewAppointment from "./pages/NewAppointment";
import Message from "./pages/Message";
import Messages from "./pages/Messages";
import NewMessage from "./pages/NewMessage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path={links.appointments_new} component={NewAppointment} />
          <Route path={links.appointments_id} component={Appointment} />
          <Route path={links.appointments} component={Appointments} />
          <Route path={links.messages_new} component={NewMessage} />
          <Route path={links.messages_id} component={Message} />
          <Route path={links.messages} component={Messages} />
          <Redirect to={links.appointments} />
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
};

export default App;
