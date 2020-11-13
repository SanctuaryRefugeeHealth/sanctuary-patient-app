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
  return jwt.patch(`/appointments/${id}`, { translator: interpreterRequsted })
};

const deleteAppointment = (id) => {
  return jwt.patch(`/appointments/${id}`, { isDeleted: true });
};

export {
  getAppointments,
  getAppointment,
  createAppointment,
  updateAppointmentConfirmed,
  updateInterpreterRequested,
  deleteAppointment,
};
