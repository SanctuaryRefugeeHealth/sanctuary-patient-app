import { jwt } from './authentication';

const getAppointments = () => {
  return jwt.get("/appointments");
};

const getAppointment = id => {
  return jwt.get(`/appointments/${id}`);
};

const createAppointment = appointment => {
  return jwt.post('/appointments', appointment);
};

const updateAppointmentConfirmed = (id, confirmed = true) => {
  return jwt.patch(`/appointments/${id}`, { isConfirmed: confirmed })
};

const confirmAppointment = (id) => {
  return updateAppointmentConfirmed(id, true)
}

const deleteAppointment = id => {
  return jwt.remove(`/appointments/${id}`);
};

export {
  getAppointments,
  getAppointment,
  createAppointment,
  confirmAppointment,
  deleteAppointment
};
