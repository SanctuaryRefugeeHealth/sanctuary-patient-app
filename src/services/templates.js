const data = [
  {
    id: "1",
    type: "appointment",
    body: "Hello, This is a message from Dr. Michael Stephenson’s office for ${patient}. You have an appointment with ${practitioner} on ${date} at the following location ${clinic}."
  }
];

const getTemplates = () => {
  return new Promise(r => r(data));
}

export { getTemplates };
