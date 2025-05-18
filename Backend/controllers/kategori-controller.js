import { getKategori, addKategoriService, updateKategoriService, deleteKategoriService } from "../services/kategori-service.js";
import Joi from "joi";

export const getKategoriController = async (request, h) => {
    const response = await getKategori();
    return h.response({
        status: 'success',
        data: response
    }).code(200);
}

export const addKategoriController = async (request, h) => {
    try {
        const schema = Joi.object({
        nama_kategori: Joi.string().min(3).required(),
        deskripsi: Joi.string().allow('').optional()
        });

        const { error, value } = schema.validate(request.payload);
        if (error) {
        return h.response({
            status: 'fail',
            msg: error.details[0].message
        }).code(400);
        }

        const { nama_kategori, deskripsi } = value;
        const newKategori = await addKategoriService(nama_kategori, deskripsi);

        return h.response({
        status: 'success',
        msg: 'Kategori berhasil ditambahkan',
        data: newKategori
        }).code(201);
    } catch (err) {
        return h.response({
        status: 'fail',
        msg: err.message
        }).code(400);
    }
};

export const updateKategoriController = async (request, h) => {
    try {
        const schema = Joi.object({
        nama_kategori: Joi.string().min(3).required(),
        deskripsi: Joi.string().allow('').optional(),
        });

        const { error, value } = schema.validate(request.payload);
        if (error) {
        return h.response({
            status: 'fail',
            msg: error.details[0].message,
        }).code(400);
        }

        const { id } = request.params;
        const { nama_kategori, deskripsi } = value;
        const updatedKategori = await updateKategoriService(id, nama_kategori, deskripsi);

        return h.response({
        status: 'success',
        msg: 'Kategori berhasil diperbarui',
        data: updatedKategori,
        }).code(200);
    } catch (err) {
        return h.response({
        status: 'fail',
        msg: err.message,
        }).code(400);
    }
};

export const deleteKategoriController = async (request, h) => {
    try {
        const { id } = request.params;
        const result = await deleteKategoriService(id);

        return h.response({
        status: 'success',
        msg: result.message,
        }).code(200);
    } catch (err) {
        return h.response({
        status: 'fail',
        msg: err.message,
        }).code(400);
    }
};