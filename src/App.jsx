import React from "react";
import theme from "./constants/theme";
import { CssBaseline } from "@material-ui/core";
import { MuiThemeProvider } from "@material-ui/core/styles";
import links from "./constants/links";
import { AuthRoute, Header, Footer } from "./components";
import Appointment from "./pages/Appointment";
import Appointments from "./pages/Appointments";
import NewAppointment from "./pages/NewAppointment";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./contexts/AuthContext";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <CssBaseline />
          <Header />
          <Switch>
            <Route
              exact
              path={links.appointments_new}
              component={AuthRoute(NewAppointment, "access:editor")}
            />
            <Route
              exact
              path={links.appointments_id}
              component={AuthRoute(Appointment, "access:viewer")}
            />
            <Route
              exact
              path={links.appointments}
              component={AuthRoute(Appointments, "access:viewer")}
            />
            <Route exact path={links.login} component={Login} />
            <Route exact path={links.not_found} component={NotFound} />
            {/* TODO: enable signup route when SU and Access granting is implemented
            <Route exact path={links.signup} component={Signup} /> */}
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
