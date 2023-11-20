import repository from "../repository";

const resource = "discounts";

export default {
  getDiscounts(limit, page, filter) {
    return repository.get(
      `${resource}?limit=${limit}&page=${page}&filter=${filter}`
    );
  },
  async getDiscountsWithSearchString({ page, limit, matchString }) {
    console.log({ page, limit, matchString });
    return repository.get(
      `${resource}/search?page=${page}&limit=${limit}&matchString=${matchString}`
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
  }
};
