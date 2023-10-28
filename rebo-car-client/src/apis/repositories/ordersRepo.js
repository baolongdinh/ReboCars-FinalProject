import repository from "../repository";

const resource = "orders";

export default {
  getOrders(limit, page, filter) {
    return repository.get(
      `${resource}?limit=${limit}&page=${page}&filter=${filter}`
    );
  },
  async createOrder(payload) {
    return repository.post(`${resource}`, payload);
  },
};
