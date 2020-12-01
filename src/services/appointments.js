import { jwt } from "./authentication";

const getAppointments = () => {
  return jwt.get("/appointments");
};

const getAppointment = (id) => {
  return jwt.get(`/appointments/${id}`);
};

const createAppointment = (appointment) => {
  return jwt.post("/appointments", appointment);
};

const updateAppointmentConfirmed = (id, confirmed = true) => {
  return jwt.patch(`/appointments/${id}`, { isConfirmed: confirmed });
};

const updateInterpreterRequested = (id, interpreterRequsted = true) => {
  return jwt.patch(`/appointments/${id}`, { translator: interpreterRequsted });
};

const deleteAppointment = (id) => {
  return jwt.patch(`/appointments/${id}`, { isDeleted: true });
};

const getResponseText = (confirmed) => {
  if (confirmed === 0) {
    return "Declined";
  } else if (confirmed === 1) {
    return "Confirmed";
  }
  return "None";
};

export {
  getResponseText,
  getAppointments,
  getAppointment,
  createAppointment,
  updateAppointmentConfirmed,
  updateInterpreterRequested,
  deleteAppointment,
};
