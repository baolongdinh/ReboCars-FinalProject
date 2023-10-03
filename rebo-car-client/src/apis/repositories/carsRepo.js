import repository from "../repository";

const resource = "cars";

export default {
  getCars(page, limit) {
    return repository.get(`${resource}?page=${page}&limit=${limit}`);
  },
  findFilterCars(page, limit, filter) {
    return repository.post(
      `${resource}/find/filter?page=${page}&limit=${limit}`,
      filter
    );
  },
  getCarById(id) {
    return repository.get(`${resource}/${id}`);
  },
  addCar(payload) {
    return repository.post(`${resource}`, payload);
  },
  updatedCar(id, payload) {
    return repository.put(`${resource}/${id}`, payload);
  },
};
