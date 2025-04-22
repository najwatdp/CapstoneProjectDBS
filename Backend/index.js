'use strict';

import Hapi from '@hapi/hapi'
import routes from './routes/auth-route.js';

const init = async () => {

    const server = Hapi.server({
        port: 5000,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['http://localhost:3000'],
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
    

    server.route(routes);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();