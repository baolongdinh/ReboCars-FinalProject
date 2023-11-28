import repository from "../repository";

const resource = "auth";

export default {
  login(email, password) {
    return repository.post(`${resource}/login`, {
      email,
      password,
    });
  },
  signUp(email, password, rePassword, name, phone) {
    return repository.post(`${resource}/signup`, {
      email,
      password,
      rePassword,
      name,
      phone,
    });
  },
  verifyEmail(token) {
    return repository.get(`${resource}/verifyemail?token=${token}`);
  },
};
