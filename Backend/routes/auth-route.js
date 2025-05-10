<<<<<<< HEAD
import { getUser, Login, refreshToken, Register } from "../controllers/auth-controller.js";
=======
import { Login, refreshToken, Register } from "../controllers/auth-controller.js";
>>>>>>> 8929cd430ef73f45ebc151ee5fd4ed0ff9880c62
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
<<<<<<< HEAD
    
=======
>>>>>>> 8929cd430ef73f45ebc151ee5fd4ed0ff9880c62
]

export default routeAuth