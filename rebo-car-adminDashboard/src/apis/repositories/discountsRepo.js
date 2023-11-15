import repository from "../repository";

const resource = "discounts";

export default {
  getDiscounts(limit, page, filter) {
    return repository.get(
      `${resource}?limit=${limit}&page=${page}&filter=${filter}`
    );
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
