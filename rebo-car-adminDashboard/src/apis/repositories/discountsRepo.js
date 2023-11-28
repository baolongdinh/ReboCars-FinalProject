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
  async updateDiscountById(id, payload) {
    return repository.put(`/admin/${resource}/${id}`, payload, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  },
  async addDiscount(payload) {
    return repository.post(`/admin/${resource}`, payload, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  },
  async activeOrBlockDiscountById(id) {
    return repository.put(`/admin/${resource}/activeOrBlock/${id}`);
  },
  async deleteDiscountById(id) {
    return repository.delete(`/admin/${resource}/${id}`);
  }
};
