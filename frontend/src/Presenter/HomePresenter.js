
export default class HomePresenter {
    
    #model;
    #view;

    constructor({ model, view }) {
        this.#model = model;
        this.#view = view;
    }

    async getCategoris() {
        try {
            const res = await this.#model.Dashboard.getKategori();
            console.log(res);
            this.#view.setCategoris(res.data);
        } catch (err) {
            console.error(err);
        }
    }
}