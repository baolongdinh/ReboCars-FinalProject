import repository from "../repository";

const resource = "orders";

export default {
  getOrders({ limit, page, filter }) {
    return repository.post(
      `${resource}/filter?limit=${limit}&page=${page}`,
      filter
    );
  },
  async createOrder(payload) {
    return repository.post(`${resource}`, payload);
  },
  async deleteOrderById(orderId) {
    return repository.delete(`${resource}/${orderId}`);
  },
  async addReviewOrderById(orderId, payload) {
    return repository.post(`${resource}/addReview/${orderId}`, payload);
  },
};
