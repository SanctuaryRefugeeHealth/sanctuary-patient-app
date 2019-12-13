import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';
import {Input, FormControl, InputLabel, FormHelperText} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const ClinicForm = () => {
    const classes = useStyles();

    return (
        <div>
            <Typography variant="h2" gutterBottom>Clinic</Typography>
            <form id="clinicForm" noValidate autoComplete="off">
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="clinic-name">Clinic Name</InputLabel>
                    <Input id="clinic-name" />
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="practitioner-name">Practitioner Name</InputLabel>
                    <Input id="practitioner-name" />
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="address">Address</InputLabel>
                    <Input id="address" />
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="phone">Phone Number</InputLabel>
                    <Input id="phone" aria-describedby="phone-helper-text" />
                    <FormHelperText id="phone-helper-text">In the format 123-123-1234</FormHelperText>
                </FormControl>
            </form>
        </div>
    );
}

export default ClinicForm;