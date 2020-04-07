import React from "react";
import theme from "./constants/theme";
import { CssBaseline } from "@material-ui/core";
import { MuiThemeProvider } from "@material-ui/core/styles";
import links from "./constants/links";
import { AuthRoute, Header, Footer } from "./components"
import Appointment from "./pages/Appointment";
import Appointments from "./pages/Appointments";
import NewAppointment from "./pages/NewAppointment";
import Message from "./pages/Message";
import Messages from "./pages/Messages";
import NewMessage from "./pages/NewMessage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AuthProvider } from "./contexts/AuthContext"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <CssBaseline />
          <Header />
          <Switch>
            <Route exact path={links.appointments_new} component={AuthRoute(NewAppointment, 'access:editor')} />
            <Route exact path={links.appointments_id} component={AuthRoute(Appointment, 'access:viewer')} />
            <Route exact path={links.appointments} component={AuthRoute(Appointments, 'access:viewer')} />
            <Route exact path={links.messages_new} component={AuthRoute(NewMessage, 'access:editor')} />
            <Route exact path={links.messages_id} component={AuthRoute(Message, 'access:viewer')} />
            <Route exact path={links.messages} component={AuthRoute(Messages, 'access:viewer')} />
            <Route exact path={links.login} component={Login} />
            <Route exact path={links.signup} component={Signup} />
            <Route>
              <Redirect to={links.appointments} />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </AuthProvider>
    </MuiThemeProvider>
  );
};

export default App;
