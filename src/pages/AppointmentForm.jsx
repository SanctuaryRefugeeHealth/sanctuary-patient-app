import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import {
  Select,
  MenuItem,
  Checkbox,
  FormControl,
  InputLabel,
  FormControlLabel
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

const AppointmentForm = () => {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  return (
    <div>
      <Typography variant="h2" gutterBottom>
        Appointment
      </Typography>
      <form id="appointmentForm">
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <FormControl className={classes.formControl}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/DD/YYYY"
              margin="normal"
              label="Appointment Date"
              value={selectedDate}
              onChange={handleDateChange}
              id="date"
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
              aria-describedby="date-helper-text"
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <KeyboardTimePicker
              margin="normal"
              id="time"
              label="Appointment Time"
              KeyboardButtonProps={{
                "aria-label": "change time"
              }}
              value={selectedDate}
              onChange={handleDateChange}
              aria-describedby="time-helper-text"
            />
          </FormControl>
        </MuiPickersUtilsProvider>

        <FormControl className={classes.formControl}>
          <InputLabel id="template-label">Template</InputLabel>
          <Select displayEmpty id="template" labelId="template-label">
            <MenuItem value="" disabled>
              None
            </MenuItem>
            <MenuItem value="1">Template 1</MenuItem>
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
            <FormControlLabel
                control={
                <Checkbox
                    id="additional-information"
                    color="primary"
                />
                }
                label="Additional Information"
            />
        </FormControl>

        <FormControl className={classes.formControl}>
        <FormControlLabel
                control={
                <Checkbox
                    id="interpretor-required"
                    color="primary"
                />
                }
                label="Interpretor"
            />
        </FormControl>
      </form>
    </div>
  );
};

export default AppointmentForm;
