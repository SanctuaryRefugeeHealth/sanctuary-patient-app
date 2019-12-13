import React from "react";
import theme from "./constants/theme";
import { MuiThemeProvider } from "@material-ui/core/styles";
import links from "./constants/links";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path={links.form}>Hello World</Route>
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
};

export default App;
