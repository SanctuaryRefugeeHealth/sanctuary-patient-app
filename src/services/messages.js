const data = [
  {
    id: "1",
    appointmentId: "1",
    templateId: "1",
    languageId: "1",
    body: "Hello, This is a message from Dr. Michael Stephenson’s office for Sample Patient. You have an appointment with Dr. Sample Practitioner on July 13, 2020 at the following location: Foo Bar Inc., 123 Fake Street, Kitchener, ON, N1O 1N0.",
    sent: new Date()
  },
  {
    id: "2",
    appointmentId: "2",
    templateId: "2",
    languageId: "2",
    body: "(Arabic) Hello, This is a message from Dr. Michael Stephenson’s office for Patient Sample. You have an appointment with Practitioner Sample, RMT on February 10th, 2020 at the following location: Boo Far Co., 678 Artificial Ave., Kitchener, ON, N1O 1N0",
    sent: new Date()
  }
];

const getMessagesByAppointmentId = (appointmentId) => {
  return new Promise(r => r(data.filter(msg => msg.appointmentId === appointmentId, [])));
}

export { getMessagesByAppointmentId }
