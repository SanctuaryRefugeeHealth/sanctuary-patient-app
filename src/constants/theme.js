import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  overrides: {
    MuiTableHead: {
      root: {
        backgroundColor: "cadetBlue"
      }
    },
    MuiTableRow: {
      hover: {
        cursor: "pointer"
      }
    }
  }
});

export default theme;
