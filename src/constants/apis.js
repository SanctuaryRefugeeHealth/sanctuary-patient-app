const base = "http://localhost:8080/api";

const APPOINTMENTS = `${base}/appointments`;
const APPOINTMENTS_ID = id => `${base}/appointments/${id}`;

export { APPOINTMENTS, APPOINTMENTS_ID };
