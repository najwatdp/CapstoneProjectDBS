
export default class NavbarComponentPresenter {

    #model;
    #view;

    constructor({ model, view }) {
        this.#model = model;
        this.#view = view;
    }

    async getKategori() {
        try {
            const res = await this.#model.getKategori();
            console.log(res);
            this.#view.setCategories(res.data);
        } catch (err) {
            console.error(err);
        }
    }
}