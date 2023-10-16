async function getLocalUser() {
  const user = await localStorage.getItem("user");
  return JSON.parse(user);
}

export default {
  user: await getLocalUser(),
};
