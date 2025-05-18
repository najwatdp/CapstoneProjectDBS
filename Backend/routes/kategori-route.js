import { addKategoriController, deleteKategoriController, getKategoriController, updateKategoriController } from "../controllers/kategori-controller.js";

const routeKategori = [
    {
        method: 'GET',
        path: '/api/kategori',
        handler: getKategoriController
    },

    {
        method: 'POST',
        path: '/api/kategori',
        handler: addKategoriController
    },

    {
        method: 'PUT',
        path: '/api/kategori/{id}',
        handler: updateKategoriController,
    },
    {
        method: 'DELETE',
        path: '/api/kategori/{id}',
        handler: deleteKategoriController,
    },
];

export default routeKategori;
