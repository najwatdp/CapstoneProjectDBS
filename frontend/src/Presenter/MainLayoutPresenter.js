
export default class MainLayoutPresenter {
    #model;
    #view;

    constructor({ model, view }) {
        this.#model = model;
        this.#view = view;
    }

    async Logout() {
        try {
            const res = await this.#model.Logout();
            console.log(res);
        } catch (err) {
            console.error(err);
        }
    }
}