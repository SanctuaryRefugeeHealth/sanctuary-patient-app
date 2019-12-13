const data = [
  {
    id: "1",
    patient: "Sample Patient",
    practitioner: "Sample Practitioner",
    date: new Date()
  }
];

export default id => {
  if (!id) return new Promise(r => r(data));
  return new Promise(r => r(data.find(appt => appt.id === id)));
};
