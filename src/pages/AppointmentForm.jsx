import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';
import { Select, MenuItem, Checkbox, FormControl, InputLabel, FormHelperText } from "@material-ui/core";
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const AppointmentForm = () => {
    const classes = useStyles();

    return (
        <div>
            <Typography variant="h2" gutterBottom>Message</Typography>
            <form id="appointmentForm">
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="date">Appointment Date</InputLabel>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date"
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            aria-describedby="date-helper-text"
                        />
                        <FormHelperText id="date-helper-text">In the format MM/dd/yyyy</FormHelperText>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="date">Appointment Time</InputLabel>
                        <KeyboardTimePicker
                            margin="normal"
                            id="time"
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                            }}
                            aria-describedby="time-helper-text"
                        />
                        <FormHelperText id="time-helper-text">In the format HH:mm AP</FormHelperText>
                    </FormControl>
                </MuiPickersUtilsProvider>

                <FormControl className={classes.formControl}>
                <InputLabel id="template-label">Template</InputLabel>
                    <Select displayEmpty id="template" labelId="template-label">
                        <MenuItem value="" disabled>None</MenuItem>
                        <MenuItem value="1">Template 1</MenuItem>
                    </Select>
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="additional-info">Additional Information</InputLabel>
                    <Checkbox id="additional-info" />
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="interpretor-required">Ask About Interpretor</InputLabel>
                    <Checkbox id="interpretor-required" />
                </FormControl>
            </form>
        </div>
    );
}

export default AppointmentForm;