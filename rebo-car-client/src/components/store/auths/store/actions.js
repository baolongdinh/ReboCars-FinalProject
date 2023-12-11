import { RepositoryFactory } from "../../../../apis/repositoryFactory";
const authRepo = RepositoryFactory.get("auths");

export default {
  login: async (context, { email, password }) => {
    const response = await authRepo.login(email, password);
    if (response.data.success === true) {
      const user = response.data.metadata;
      window.sessionStorage.setItem("user", JSON.stringify(user));
      window.sessionStorage.setItem(
        "accessToken",
        "Bearer " + user.accessToken
      );
      window.sessionStorage.setItem(
        "refreshToken",
        "Bearer " + user.refreshToken
      );
      context.commit("setUser", user);
      return user;
    }
  },
  logOut: async (context) => {
    window.sessionStorage.removeItem("user");
    window.sessionStorage.removeItem("accessToken");
    window.sessionStorage.removeItem("refreshToken");
    context.commit("setUser", null);
  },

  signUp: async (context, { email, password, rePassword, name, phone }) => {
    await authRepo.signUp(email, password, rePassword, name, phone);
  },
};
