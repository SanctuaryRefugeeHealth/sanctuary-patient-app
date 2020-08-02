import { jwt } from "./authentication";

const getLanguages = () => {
  return jwt.get("/languages");
};

export { getLanguages };
