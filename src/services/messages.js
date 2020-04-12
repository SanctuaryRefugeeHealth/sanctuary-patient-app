import { jwt } from './authentication';

const getMessages = (id) => {
  return jwt.get(`/appointments/${id}/messages`)
}

export { getMessages }
