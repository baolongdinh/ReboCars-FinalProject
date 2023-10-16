import repository from "../repository";

const resource = "auth";

export default {
  login(email, password) {
    return repository.post(`${resource}/login`, {
      email,
      password,
    });
  },
};
