import { RepositoryFactory } from "../../../../apis/repositoryFactory";
const carsRepo = RepositoryFactory.get("cars");
const discountsRepo = RepositoryFactory.get("discounts");
export default {
  findCarsFilter: async (context, { page, limit, filterPayload }) => {
    console.log({ filterPayload });
    const response = await carsRepo.findFilterCars(page, limit, filterPayload);
    if (response) {
      const cars = response.data.metadata.cars;
      console.log(response);
      context.commit("setCars", cars);
      return cars;
    }
  },

  findCarById: async (context, id) => {
    const response = await carsRepo.findCarById(id);
    if (response) {
      const car = response.data.metadata.car;
      return car;
    }
  },

  getAllDiscount: async (context, { page, limit, filter }) => {
    const response = await discountsRepo.getDiscounts(
      page,
      limit,
      JSON.stringify(filter)
    );
    if (response) {
      const discounts = response.data.metadata.discounts;
      return discounts;
    }
  },
  matchSortSelected: async (context, sortSelected) => {
    const sort = {};
    if (sortSelected === "Giá thấp nhất") {
      sort.discountPrice = 1;
    } else if (sortSelected === "Giá cao nhất") {
      sort.discountPrice = -1;
    } else if (sortSelected === "Đánh giá tốt nhất") {
      sort.reviewRateAvg = -1;
    } else if (sortSelected === "Giảm giá nhiều nhất") {
      sort.discount = -1;
    } else {
      sort.discountPrice = 1;
      sort.reviewRateAvg = -1;
      sort.discount = -1;
    }

    return sort;
  },
};
