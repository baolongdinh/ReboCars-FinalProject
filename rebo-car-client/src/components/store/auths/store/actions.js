import { RepositoryFactory } from "../../../../apis/repositoryFactory";
const authRepo = RepositoryFactory.get("auths");

export default {
  login: async (context, { email, password }) => {
    const response = await authRepo.login(email, password);
    if (response.data.success === true) {
      const user = response.data.metadata;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("accessToken", "Bearer " + user.accessToken);
      localStorage.setItem("refreshToken", "Bearer " + user.refreshToken);
      context.commit("setUser", user);
      return user;
    }
  },
};
