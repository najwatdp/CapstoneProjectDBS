
export default class ArticlePresenter {

    #model;
    #view;

    constructor({ model, view }) {
        this.#model = model;
        this.#view = view;
    }

    async createArticle(judul, isi, images, status, author, kategori) {
        this.#view.setLoading(true);

        try {
            const data = new FormData();
            data.append("judul", judul);
            data.append("isi", isi);
            data.append("images", images);
            data.append("status", status);
            data.append("author", author);
            data.append("kategori_id", kategori);
            const res = await this.#model.createArticle(data);
            console.log(res);
        } catch (err) {
            console.error(err);
        } finally {
            this.#view.setLoading(false);
        }
    }
    async getArticle() {
        try {
            const res = await this.#model.getArticle();
            console.log(res);
            this.#view.setRenderArticle(res.data);
            this.#view.setArticle(res.data);
        } catch (err) {
            console.error(err);
        }
    }
    async deleteArticle(id) {
        try {
            if (!confirm("Apakah anda yakin ingin menghapusnya?")) {
                console.log("gagal menghapus article");
                return;
            }
            const res = await this.#model.deleteArticle(id);
            await this.getArticle();
            console.log(res);
        } catch (err) {
            console.error(err);
        }
    }
    async updateArticle(id, judul, isi, images, status, author, kategori, article) {
        this.#view.setLoading(true);
        try {
            const data = new FormData();
            data.append("judul", judul ? judul : article.judul);
            data.append("isi", isi ? isi : article.isi);
            data.append("status", status ? status : article.status);
            data.append("author", author ? author : article.author);
            data.append("kategori_id", kategori ? kategori : article.kategori_id);
            data.append("images", images);
            const res = await this.#model.updateArticle(id, data);
            console.log(res);
        } catch (err) {
            console.error(err);
        } finally {
            this.#view.setLoading(false);
        }
    }
    async getKategori() {
        try {
            const res = await this.#model.getKategori();
            this.#view.setKategoris(res.data);
        } catch (err) {
            console.error(err);
        }
    }
}