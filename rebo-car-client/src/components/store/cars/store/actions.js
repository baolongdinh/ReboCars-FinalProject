import { RepositoryFactory } from "../../../../apis/repositoryFactory";
const carsRepo = RepositoryFactory.get("cars");

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

  matchSortSelected: async (context, sortSelected) => {
    const sort = {};
    if (sortSelected === "Giá thấp nhất") {
      sort.price = 1;
    } else if (sortSelected === "Giá cao nhất") {
      sort.price = -1;
    } else if (sortSelected === "Đánh giá tốt nhất") {
      sort.reviewRateAvg = -1;
    } else if (sortSelected === "Giảm giá nhiều nhất") {
      sort.discount = -1;
    } else {
      sort.price = 1;
      sort.reviewRateAvg = -1;
      sort.discount = -1;
    }

    return sort;
  },
};
