import React from "react";
import {
    TextField,
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Grid
} from "@material-ui/core";
import languages from "../../constants/languages";

const FormPatient = ({ props }) => {
    const languageOptions = languages.map(language => {
        return <MenuItem value={language.id} key={language.id}>{language.name}</MenuItem>
    });

    return (
        <div className={props.classes.content}>
            <Typography variant="h6" className={props.classes.subtitle} gutterBottom>Patient</Typography>
            <Grid container spacing={3}>
                <Grid item xs={6} sm={4}>
                    <TextField
                        id="patientName"
                        name="patientName"
                        label="Name"
                        value={props.formData.patientName}
                        className={props.classes.textField}
                        fullWidth
                        autoComplete="patientName"
                        onChange={props.handle('changeText')}
                        required />
                </Grid>
                <Grid item xs={6} sm={4}>
                    <TextField
                        id="patientPhoneNumber"
                        name="patientPhoneNumber"
                        label="Phone Number"
                        value={props.formData.patientPhoneNumber}
                        className={props.classes.textField}
                        fullWidth
                        autoComplete="patientPhoneNumber"
                        onChange={props.handle('changeText')}
                        required />
                </Grid>
                <Grid item xs={6} sm={4}>
                    <FormControl className={props.classes.formControl}>
                        <InputLabel id="language-label" required>Language</InputLabel>
                        <Select
                            id="patientLanguage"
                            labelId="language-label"
                            value={props.formData.patientLanguage}
                            onChange={props.handle('changeLanguage')}
                            required>
                            <MenuItem value={0} disabled>None</MenuItem>
                            {languageOptions}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </div>
    )
}

export default FormPatient