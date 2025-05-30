import { startSession, submitAnswer, getAllCategories, getCekKesehatanDetail } from "../services/cekKesehatan-service.js";

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
