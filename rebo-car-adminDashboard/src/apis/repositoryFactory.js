import usersRepo from "./repositories/usersRepo";
import carsRepo from "./repositories/carsRepo";
import discountsRepo from "./repositories/discountsRepo";
import authsRepo from "./repositories/authsRepo";
import paymentRepo from "./repositories/paymentRepo";
import ordersRepo from "./repositories/ordersRepo";
import rolesRepo from "./repositories/rolesRepo";

const repositories = {
  users: usersRepo,
  cars: carsRepo,
  discounts: discountsRepo,
  auths: authsRepo,
  payment: paymentRepo,
  orders: ordersRepo,
  roles: rolesRepo
};

export const RepositoryFactory = {
  get: name => repositories[name]
};
