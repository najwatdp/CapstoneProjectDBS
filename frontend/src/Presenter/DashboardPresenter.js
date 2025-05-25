export default class DashboardPresenter {
  #model;
  #view;

  constructor({ model, view }) {
    this.#model = model;
    this.#view = view;
  }

  async getUser() {
    try {
      const res = await this.#model.Users.getUsers();
      console.log(res);
      this.#view.setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  }
}
