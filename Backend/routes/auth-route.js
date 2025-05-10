import { Cookie, getUser, Login, refreshToken, Register } from "../controllers/auth-controller.js";
import {verifyToken} from "../middleware/verifyToken.js";

const routeAuth = [
    {
        method: 'GET',
        path: '/user',
        options: {
            pre: [{ method: verifyToken }],
            handler: (request, h) => {
            return {
                message: 'Akses dashboard berhasil!',
                user: request.auth.credentials
            };
            }
        }
    },

    {
        method: 'POST',
        path: '/user',
        handler: Register
    },
    
    {
        method: 'POST',
        path: '/login',
        handler: Login
    },

    {
        method: 'GET',
        path: '/token',
        handler: refreshToken
    },

    {
        method: 'GET',
        path: '/verifyToken',
        handler: Cookie
    }
]

export default routeAuth