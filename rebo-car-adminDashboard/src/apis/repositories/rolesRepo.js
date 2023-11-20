import repository from "../repository";

const resource = "roles";

export default {
  async getRolesWithSearchString({ page, limit, matchString }) {
    console.log({ page, limit, matchString });
    return repository.get(
      `/admin/${resource}/search?page=${page}&limit=${limit}&matchString=${matchString}`
    );
  }
};
