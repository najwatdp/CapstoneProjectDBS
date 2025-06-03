import { startSession, submitAnswer, getAllCategories, getCekKesehatanDetail } from "../services/cekKesehatan-service.js";
import Kesehatan from "../models/kesehatan-model.js";
import axios from 'axios';

export const handleStartSession = async (request, h) => {
    try {
        const { id } = request.params;
        const result = await startSession(id);

        if (!result) return h.response({ error: 'Cek kesehatan tidak ditemukan' }).code(404);

        const { session, firstQuestion, totalQuestions } = result;

        return h.response({
            session_id: session.id,
            question: firstQuestion,
            progress: {
                current: 1,
                total: totalQuestions
            }
        }).code(200);
    } catch (error) {
        console.error(error);
        return h.response({ error: 'Internal server error' }).code(500);
    }
};

export const handleSubmitAnswer = async (request, h) => {
    try {
        const result = await submitAnswer(request.payload);
        if (!result) return h.response({ error: 'Session tidak ditemukan' }).code(404);

        return h.response(result).code(200);
    } catch (error) {
        console.error(error);
        return h.response({ error: 'Internal server error' }).code(500);
    }
};

export const handleGetCategories = async (request, h) => {
    try {
        const categories = await getAllCategories();
        return h.response(categories).code(200);
    } catch (error) {
        console.error(error);
        return h.response({ error: 'Internal server error' }).code(500);
    }
};

export const handleGetDetail = async (request, h) => {
    try {
        const { id } = request.params;
        const data = await getCekKesehatanDetail(id);

        if (!data) return h.response({ error: 'Cek kesehatan tidak ditemukan' }).code(404);
        return h.response(data).code(200);
    } catch (error) {
        console.error(error);
        return h.response({ error: 'Internal server error' }).code(500);
    }
};



export const createKesehatan = async (request, h) => {
  try {
    const { id_kategori, title, deskripsi, saran } = request.payload;

    if (!id_kategori || !title || !saran) {
      return h.response({ message: 'id_kategori, title, dan saran wajib diisi' }).code(400);
    }

    const newKesehatan = await Kesehatan.create({
      id_kategori,
      title,
      deskripsi,
      saran,
    });

    return h.response({
      message: 'Data kesehatan berhasil dibuat',
      data: newKesehatan,
    }).code(201);

  } catch (error) {
    console.error(error);
    return h.response({
      message: 'Terjadi kesalahan saat menyimpan data kesehatan',
      error: error.message,
    }).code(500);
  }
};



export const handleHealthCheck = async (request, h) => {
  const { symptoms } = request.payload;

  try {
    const response = await axios.post('http://localhost:3000/predict', {
      symptoms
    });

    return h.response(response.data).code(200);
  } catch (error) {
    console.error('Error forwarding to ML model:', error.message);
    return h.response({
      error: 'Gagal menghubungi server machine learning',
      detail: error.message
    }).code(500);
  }
};

