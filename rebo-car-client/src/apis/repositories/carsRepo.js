import repository from "../repository";

const resource = "cars";

export default {
  getCars({ page, limit, filter }) {
    return repository.get(
      `${resource}?page=${page}&limit=${limit}&filter=${filter}`
    );
  },
  findFilterCars(page, limit, filter) {
    return repository.post(
      `${resource}/find/filter?page=${page}&limit=${limit}`,
      filter
    );
  },
  findCarById(id) {
    return repository.get(`${resource}/${id}`);
  },
  addCar(payload) {
    return repository.post(`${resource}`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  updatedCar(id, payload) {
    return repository.put(`${resource}/userCars/${id}`, payload);
  },
  activeOrBlockCarById(id) {
    return repository.put(`${resource}/activeOrBlock/${id}`);
  },
  updatedCarImages(id, payload) {
    return repository.patch(`${resource}/carImages/${id}`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
