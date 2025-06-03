import { getUser, Login, refreshToken, Register, requestPasswordReset, resetPassword } from "../controllers/auth-controller.js";
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
    method: 'POST',
    path: '/request-password-reset',
    handler: requestPasswordReset
  },
  {
    method: 'POST',
    path: '/reset-password/{token}',
    handler: resetPassword
  }
    
]

export default routeAuth