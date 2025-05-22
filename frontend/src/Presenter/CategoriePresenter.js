
export default class CategoriPresenter {
    #model;
    #view;

    constructor({ model, view }) {
        this.#model = model;
        this.#view = view;
    }

    async getKategori() {
        this.#view.setLoading(true);
        try {
            const res = await this.#model.getKategori();
            this.#view.Kategoris(res.data);
            console.log(res);
        } catch (err) {
            console.error(err);
        } finally {
            this.#view.setLoading(false);
        }
    }

    async createKategori(kategori, deskripsi) {
        this.#view.setLoading(true);
        try {
            const res = await this.#model.createKategori(kategori, deskripsi);
            this.getKategori();
            console.log(res);
        } catch (err) {
            console.error(err);
        } finally {
            this.#view.setLoading(false);
        }
    }

    async editKategori(id, kategori, deskripsi) {
        this.#view.setLoading(true);

        try {
            const res = await this.#model.editKategori(id, kategori, deskripsi);
            this.getKategori();
        } catch (err) {
            console.error(err);
        } finally {
            this.#view.setLoading(false);
        }
    }

    async deleteKategori(id) {
        this.#view.setLoading(true);

        if (!confirm("Apakah anda benar ingin menghapusnya?")) {
            console.log("tidak jadi menghapus kategori");
            return;
        }

        try {
            const res = await this.#model.deleteKategori(id);
            if (res.status === "success") {
                await this.getKategori();
                console.log("Berhasil Menghapus kategori");
            }
        } catch (err) {
            console.error(err);
        }
        finally {
            this.#view.setLoading(false);
        }
    }
    async simpanKategori(id, kategori, deskripsi, kategoris) {
        if (id !== null) {
            const searchKategoriById = kategoris.find(value => value.id === id);
            await this.editKategori(id, searchKategoriById.nama_kategori, deskripsi);
            this.#view.setShowModal(false);
            return;
        }
        await this.createKategori(kategori, deskripsi);
        this.#view.setShowModal(false);
    }
}
