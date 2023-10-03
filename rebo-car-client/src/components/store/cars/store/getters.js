export default {
  getFeatures(state) {
    return state.features;
  },
  getFuels(state) {
    return state.fuels;
  },
  getCars(state) {
    return state.cars;
  },
  getPage(state) {
    return state.page;
  },
  getLimit(state) {
    return state.limit;
  },
  getStartDateTime(state) {
    return state.startDateTime;
  },
  getEndDateTime(state) {
    return state.endDateTime;
  },
  getLocation(state) {
    return state.location;
  },
  getSortOptions(state) {
    return state.sortOptions;
  },
  getAutoMakers(state) {
    return state.autoMakers;
  },
  getListTypeOfCars(state) {
    return state.typeOfCars;
  },
  getFilters(state) {
    return state.filters;
  },
};
