import repository from "../repository";

const resource = "users";

export default {
  getUsers() {
    return repository.get(`${resource}`);
  },
  getUserById(id) {
    return repository.get(`${resource}/${id}`);
  },
  addUser(payload) {
    return repository.post(`${resource}`, payload);
  },
  updatedUser(id, payload) {
    return repository.put(`${resource}/${id}`, payload);
  },
};
