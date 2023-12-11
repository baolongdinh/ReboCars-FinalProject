function getLocalUser() {
  const user = window.sessionStorage.getItem("user");
  return JSON.parse(user);
}

export default {
  user: getLocalUser(),
};
