import usersRepo from "./repositories/usersRepo";
import carsRepo from "./repositories/carsRepo";

const repositories = {
  users: usersRepo,
  cars: carsRepo,
};

export const RepositoryFactory = {
  get: (name) => repositories[name],
};
