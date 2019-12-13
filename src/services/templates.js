const data = [
  {
    templateId: "1",
    templateName: "appointment",
    "1": "`Hello, This is a message from Dr. Michael Stephenson’s office for ${patient}. You have an appointment with ${practitioner} on ${date} at the following location ${clinic}.`",
    "2": "`(Arabic) Hello, This is a message from Dr. Michael Stephenson’s office for ${patient}. You have an appointment with ${practitioner} on ${date} at the following location ${clinic}.`"
  }
];

const getTemplates = () => {
  return new Promise(r => r(data));
}

export { getTemplates };
