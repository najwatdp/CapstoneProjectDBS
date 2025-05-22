'use strict';

import Hapi, { server } from '@hapi/hapi'
import routeAuth from './routes/auth-route.js';
import db from './config/db.js';
import routePenyakit from './routes/penyakit-route.js';
import Penyakit from './models/penyakit-model.js';
import KategoriKesehatan from './models/kategori-kesehatan.js';
import CekKesehatan from './models/cekKesehatan-model.js';
import Kulit from './models/kulit-model.js';
import Kehamilan from './models/kehamilan-model.js';
import KonsultasiPenyakit from './models/konsultasi-penyakit.js';
import routeUser from './routes/user-route.js';
import routeKategori from './routes/kategori-route.js';

const init = async () => {

    const server = Hapi.server({
        port: 5000,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['http://localhost:5173'],
                credentials: true,
                headers: ['Authorization', 'Content-Type']
            },
        }
    });

    server.state('refreshToken', {
        ttl: null,
        isSecure: false, // ubah ke true kalau sudah pakai https
        isHttpOnly: true,
        path: '/',
        encoding: 'none', // biar bisa baca token string biasa
    });

    try {
        await db.authenticate();
        console.log('Database Connected...');
        await db.sync();
    } catch (error) {
        
    }
    

    server.route(routeKategori);
    server.route(routeUser)
    server.route(routePenyakit);
    server.route(routeAuth);


    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});


init();