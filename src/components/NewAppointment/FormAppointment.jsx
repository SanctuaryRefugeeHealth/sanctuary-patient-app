import React from "react";
import { Typography, FormControl, Grid } from "@material-ui/core";
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import languages from "../../constants/languages";

function getLanguageByIdx(idx) {
    if (idx > 0 && idx < languages.length)
        return languages[idx].name
    return ''
}

const FormAppointment = ({ props }) => {
    return (
        <div className={props.classes.content}>
            <Typography variant="h6" className={props.classes.subtitle} gutterBottom>Patient</Typography>
            <Grid container spacing={1}>
                <Grid item xs={4} sm={4}>
                    <Typography className={props.classes.textField} gutterBottom>{props.formData.patientName}</Typography>
                </Grid>
                <Grid item xs={4} sm={4}>
                    <Typography className={props.classes.textField} gutterBottom>{getLanguageByIdx(props.formData.patientLanguage - 1)}</Typography>
                </Grid>
                <Grid item xs={4} sm={4}>
                    <Typography className={props.classes.textField} gutterBottom>{props.formData.patientPhoneNumber}</Typography>
                </Grid>
            </Grid>

            <Typography variant="h6" className={props.classes.subtitle} gutterBottom>Clinic</Typography>
            <Grid container spacing={1}>
                <Grid item xs={4} sm={4}>
                    <Typography className={props.classes.textField}>{props.formData.practitionerClinicName}</Typography>
                </Grid>
                <Grid item xs={4} sm={4}>
                    <Typography className={props.classes.textField}>{props.formData.specialistName}</Typography>
                </Grid>
                <Grid item xs={4} sm={4}>
                    <Typography className={props.classes.textField}>{props.formData.practitionerPhoneNumber}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography className={props.classes.textField} gutterBottom>{props.formData.location}</Typography>
                </Grid>
            </Grid>

            <Typography variant="h6" className={props.classes.subtitle} gutterBottom>Appointment</Typography>
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <Grid container spacing={1}>
                    <Grid item xs={6} sm={6}>
                        <FormControl className={props.classes.formControl} fullWidth>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="MM/DD/YYYY"
                                margin="normal"
                                label="Appointment Date"
                                value={props.selectedDate}
                                onChange={props.handle('changeDate')}
                                id="date"
                                KeyboardButtonProps={{
                                    "aria-label": "change date"
                                }}
                                aria-describedby="date-helper-text"
                                required />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <FormControl className={props.classes.formControl} fullWidth>
                            <KeyboardTimePicker
                                margin="normal"
                                id="time"
                                label="Appointment Time"
                                KeyboardButtonProps={{
                                    "aria-label": "change time"
                                }}
                                value={props.selectedDate}
                                onChange={props.handle('changeDate')}
                                aria-describedby="time-helper-text"
                                required />
                        </FormControl>
                    </Grid>
                </Grid>
            </MuiPickersUtilsProvider>
        </div>
    )
}

export default FormAppointment