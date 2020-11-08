import { jwt } from "./authentication";

const getMessages = (id) => {
  return jwt.get(`/appointments/${id}/messages`);
};

const getCommunications = (id) => {
  return jwt.get(`/communications/${id}`);
};

export { getMessages, getCommunications };
