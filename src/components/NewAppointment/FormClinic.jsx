import React from "react";
import { TextField, Typography, Grid } from "@material-ui/core";

const FormClinic = ({ props }) => {
    return (
        <div className={props.classes.content}>
            <Typography variant="h6" className={props.classes.subtitle} gutterBottom>Clinic</Typography>
            <Grid container spacing={3}>
                <Grid item xs={6} sm={4}>
                    <TextField
                        id="practitionerClinicName"
                        name="practitionerClinicName"
                        label="Clinic Name"
                        value={props.formData.practitionerClinicName}
                        className={props.classes.textField}
                        fullWidth
                        autoComplete="practitionerClinicName"
                        onChange={props.handle('changeText')}
                        required />
                </Grid>
                <Grid item xs={6} sm={4}>
                    <TextField
                        id="specialistName"
                        name="specialistName"
                        label="Specialist Name"
                        value={props.formData.specialistName}
                        className={props.classes.textField}
                        fullWidth
                        autoComplete="specialistName"
                        onChange={props.handle('changeText')}
                        required />
                </Grid>
                <Grid item xs={6} sm={4}>
                    <TextField
                        id="practitionerPhoneNumber"
                        name="practitionerPhoneNumber"
                        label="Phone Number"
                        value={props.formData.practitionerPhoneNumber}
                        className={props.classes.textField}
                        fullWidth
                        autoComplete="practitionerPhoneNumber"
                        onChange={props.handle('changeText')}
                        required />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="location"
                        name="location"
                        label="Address"
                        value={props.formData.location}
                        className={props.classes.textField}
                        fullWidth
                        autoComplete="location"
                        onChange={props.handle('changeText')}
                        required />
                </Grid>
            </Grid>
        </div>
    )
}

export default FormClinic