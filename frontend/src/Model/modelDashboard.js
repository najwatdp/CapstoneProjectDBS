import { instance } from ".";

export default class Dashboard {

    async getKategori() {
        const res = await instance.get('/api/kategori');
        return res.data;
    }

    async createKategori(kategori, deskripsi) {
        const res = await instance.post('/api/kategori', {
            nama_kategori: kategori,
            deskripsi: deskripsi
        })
        return res.data;
    }

    async editKategori(id, kategori, deskripsi) {
        const res = await instance.put(`/api/kategori/${id}`, {
            nama_kategori: kategori,
            deskripsi: deskripsi
        })

        return res.data;
    }
    
    async deleteKategori(id) {
        const res = await instance.delete(`/api/kategori/${id}`);
        return res.data;
    }
}