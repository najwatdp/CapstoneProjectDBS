import { getUser, Login, refreshToken, Register } from "../controllers/auth-controller.js";
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
    }

]

export default routeAuth