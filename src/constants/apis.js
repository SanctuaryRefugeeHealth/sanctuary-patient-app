const base = "localhost:5000";

const APPOINTMENTS = `${base}/appointments`;
const APPOINTMENTS_ID = id => `${base}/appointments/${id}`;

export default {
  APPOINTMENTS,
  APPOINTMENTS_ID
};
