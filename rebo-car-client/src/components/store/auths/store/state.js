function getLocalUser() {
  const user = localStorage.getItem("user");
  return JSON.parse(user);
}

export default {
  user: getLocalUser(),
};
