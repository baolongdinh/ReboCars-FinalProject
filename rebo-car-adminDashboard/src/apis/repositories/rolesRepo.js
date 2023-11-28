import repository from "../repository";

const resource = "roles";

export default {
  async getRolesWithSearchString({ page, limit, matchString }) {
    console.log({ page, limit, matchString });
    return repository.get(
      `/admin/${resource}/search?page=${page}&limit=${limit}&matchString=${matchString}`
    );
  },
  async getAllRoles() {
    return repository.get(`/admin/${resource}`);
  },
  async updateRoleById(id, payload) {
    return repository.put(`/admin/${resource}/${id}`, payload);
  },
  async deleteRoleById(id) {
    return repository.delete(`/admin/${resource}/${id}`);
  },
  async addRole(payload) {
    return repository.post(`/admin/${resource}`, payload);
  }
};
