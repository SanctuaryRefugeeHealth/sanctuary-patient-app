import React from "react";
import Typography from "@material-ui/core/Typography";
import {Input} from "@material-ui/core";

const ClinicForm = () => {
    return (
        <div>
            <Typography variant="h2" gutterBottom>Clinic</Typography>
            <form id="clinicForm">
                <Input type="text" placeholder="Clinic Name" />
                <Input type="text" placeholder="Practitioner Name" />
                <Input type="text" placeholder="Address" />
                <Input type="text" placeholder="Phone Number" />
            </form>
        </div>
    );
}

export default ClinicForm;