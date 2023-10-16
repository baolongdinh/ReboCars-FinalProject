import usersRepo from "./repositories/usersRepo";
import carsRepo from "./repositories/carsRepo";
import discountsRepo from "./repositories/discountsRepo";
import authsRepo from "./repositories/authsRepo";

const repositories = {
  users: usersRepo,
  cars: carsRepo,
  discounts: discountsRepo,
  auths: authsRepo,
};

export const RepositoryFactory = {
  get: (name) => repositories[name],
};
