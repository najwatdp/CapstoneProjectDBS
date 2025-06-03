

export default class KesehatanPresenter {

    #model;
    #view;

    constructor({ model, view }) {
        this.#model = model;
        this.#view = view;
    }

    async startCekkesehatan() {
        this.#view.setLoading(true);
        try {
            const res = await this.#model.getCookie();
            console.log(res);
            if (res.status === "success") {
                
            }
        } catch (err) {
            this.#view.navigate("/login");
        } finally {
            this.#view.setLoading(false);
        }
    }
}