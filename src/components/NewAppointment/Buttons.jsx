import React from "react";
import { Link, Button } from "@material-ui/core";

const Buttons = ({ props }) => {
    return (
        <div className={props.classes.buttons}>
            {props.activeStep === 0 && (
                <Link
                    href="/appointments"
                    className={props.classes.button}>
                    CANCEL
                </Link>
            )}
            {props.activeStep !== 0 && (
                <Button
                    onClick={props.handle('moveBack')}
                    className={props.classes.button}>
                    Back
                </Button>
            )}
            {props.activeStep !== props.steps.length - 1 && (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={props.handle('moveNext')}
                    className={props.classes.button}
                    type="button">
                    Next
                </Button>
            )}
            {props.activeStep === props.steps.length - 1 && (
                <Button
                    variant="contained"
                    color="primary"
                    className={props.classes.button}
                    type="submit"
                    form="new-appointment-form">
                    Create Appointment
                </Button>
            )}
        </div>
    )
}

export default Buttons