import React, { useState, useEffect } from "react";
import { getAppointmentById } from "../services/appointments";
import { CircularProgress, Typography } from "@material-ui/core/";
import { useLocation } from "react-router-dom";
import moment from "moment";

export default () => {
  const [appointment, setAppointment] = useState();
  const location = useLocation();
  useEffect(() => {
    const getData = async () => {
      const appointmentId = location.pathname.split("/").pop();
      const data = await getAppointmentById(appointmentId);
      setAppointment(data);
    };
    getData();
  });
  if (!appointment) return <CircularProgress />;
  return (
    <>
      <Typography variant="h5">Patient</Typography>
      <Typography gutterBottom>{appointment.patientName}</Typography>
      <Typography variant="h5">Phone</Typography>
      <Typography gutterBottom>{appointment.patientPhone}</Typography>
      <Typography variant="h5">Practitioner</Typography>
      <Typography gutterBottom>{appointment.practitionerName}</Typography>
      <Typography variant="h5">Clinic</Typography>
      <Typography gutterBottom>{appointment.clinicName}</Typography>
      <Typography variant="h5">Address</Typography>
      <Typography gutterBottom>{appointment.clinicAddress}</Typography>
      <Typography variant="h5">Date</Typography>
      <Typography gutterBottom>
        {moment(appointment.date).format("ll")}
      </Typography>
      <Typography variant="h5">Is Confirmed</Typography>
      <Typography gutterBottom>
        {appointment.confirmed ? "Yes" : "No"}
      </Typography>
    </>
  );
};
