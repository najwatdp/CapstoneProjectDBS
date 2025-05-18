import KategoriKesehatan from "../models/kategori-kesehatan.js";
import { Op } from "sequelize";

export const getKategori = async () => {
    const data = await KategoriKesehatan.findAll();
    return data;
}

export const addKategoriService = async (nama_kategori, deskripsi) => {
    const existing = await KategoriKesehatan.findOne({ where: { nama_kategori } });
    if (existing) {
        throw new Error('Nama kategori sudah digunakan');
    }

    const newKategori = await KategoriKesehatan.create({ nama_kategori, deskripsi });
    return newKategori;
};


export const updateKategoriService = async (id, nama_kategori, deskripsi) => {
    const kategori = await KategoriKesehatan.findByPk(id);
    if (!kategori) {
        throw new Error('Kategori tidak ditemukan');
    }

    const existing = await KategoriKesehatan.findOne({
        where: {
        nama_kategori,
        id: { [Op.ne]: id }, 
        },
    });

    if (existing) {
        throw new Error('Nama kategori sudah digunakan');
    }

    kategori.nama_kategori = nama_kategori;
    kategori.deskripsi = deskripsi;
    await kategori.save();

    return kategori;
};


export const deleteKategoriService = async (id) => {
    const kategori = await KategoriKesehatan.findByPk(id);
    if (!kategori) {
        throw new Error('Kategori tidak ditemukan');
    }

    await kategori.destroy();
    return { message: 'Kategori berhasil dihapus' };
};