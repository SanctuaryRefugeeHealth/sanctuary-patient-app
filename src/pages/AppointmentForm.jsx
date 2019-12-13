import React from "react";
import Typography from "@material-ui/core/Typography";
import {Input, Select, MenuItem, Checkbox} from "@material-ui/core";

const AppointmentForm = () => {
    return (
        <div>
            <Typography variant="h2" gutterBottom>Message</Typography>
            <form id="appointmentForm">
                <Input type="datetime-local" placeholder="Date" />
                <Select>
                    <MenuItem value="0">Template 1</MenuItem>
                </Select>
                <Checkbox />
                <Checkbox />
            </form>
        </div>
    );
}

export default AppointmentForm;