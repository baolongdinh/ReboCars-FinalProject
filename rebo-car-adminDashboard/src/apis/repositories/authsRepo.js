import repository from "../repository";

const resource = "auth";

export default {
  login(email, password) {
    return repository.post(`${resource}/login`, {
      email,
      password
    });
  },
  async adminLogin(email, password) {
    return repository.post(`${resource}/admin/login`, {
      email,
      password
    });
  },
  signUp(email, password, rePassword, name, phone) {
    return repository.post(`${resource}/signup`, {
      email,
      password,
      rePassword,
      name,
      phone
    });
  }
};
