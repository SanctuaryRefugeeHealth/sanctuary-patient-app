import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  overrides: {
    MuiTableHead: {
      root: {
        backgroundColor: "cadetBlue"
      }
    }
  }
});

export default theme;
