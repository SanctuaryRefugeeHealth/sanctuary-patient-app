import { jwt } from "./authentication";

const getCommunications = (id) => {
  return jwt.get(`/communications/${id}`);
};

export { getCommunications };
