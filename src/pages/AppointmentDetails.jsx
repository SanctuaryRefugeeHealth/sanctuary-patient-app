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
      <Typography variant="h5" gutterBottom>
        Patient Name
      </Typography>
      {appointment.patientName}
      <Typography variant="h5" gutterBottom>
        Phone
      </Typography>
      {appointment.patientName}
      <Typography variant="h5" gutterBottom>
        Practitioner
      </Typography>
      {appointment.patientName}
      <Typography variant="h5" gutterBottom>
        Clinic
      </Typography>
      {appointment.patientName}
      <Typography variant="h5" gutterBottom>
        Address
      </Typography>
      {appointment.clinicAddress}
      <Typography variant="h5" gutterBottom>
        Date
      </Typography>
      {moment(appointment.patientName).format("ll")}
      <Typography variant="h5" gutterBottom>
        Is Confirmed
      </Typography>
      {appointment.confirmed}
    </>
  );
};
