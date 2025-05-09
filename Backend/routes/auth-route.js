import { Cookie, getUser, Login, refreshToken, Register, RemoveCookie } from "../controllers/auth-controller.js";
import {verifyToken} from "../middleware/verifyToken.js";

const routeAuth = [
    {
        method: 'GET',
        path: '/user',
        options: {
            pre: [{ method: verifyToken }],
            handler: getUser
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
        path: '/cookie',
        handler: Cookie
    },
    {
        method: 'GET',
        path: '/remove-cookie',
        handler: RemoveCookie
    }
]

export default routeAuth