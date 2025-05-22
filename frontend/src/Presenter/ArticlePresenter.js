
export default class ArticlePresenter {

    #model;
    #view;

    constructor({ model, view }) {
        this.#model = model;
        this.#view = view;
    }

    async createArticle(judul, isi, images) {
        this.#view.setLoading(true);

        try {
            const data = new FormData();
            data.append("judul", judul);
            data.append("isi", isi);
            data.append("images", images);

            const res = await this.#model.createArticle(data);
            console.log(res);
        } catch (err) {
            console.error(err);
        } finally {
            this.#view.setLoading(false);
        }
    }
}