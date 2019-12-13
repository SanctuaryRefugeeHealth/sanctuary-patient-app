import React from "react";
import theme from "./constants/theme";
import { MuiThemeProvider } from "@material-ui/core/styles";

const App = () => {
  return <MuiThemeProvider theme={theme}>Hello World</MuiThemeProvider>;
};

export default App;
