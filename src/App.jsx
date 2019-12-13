import React from "react";
import theme from "./constants/theme";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/">Hello World</Route>
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
};

export default App;
