import { addUser, deleteUser, indexUser, searchEmailHandler, updateUser } from "../controllers/user-controller.js"


const routeUser = [
    {
        method: 'GET',
        path: '/api/users',
        handler: indexUser
    },

    {
        method: 'POST',
        path: '/api/users',
        handler: addUser
    },

    {
        method: 'PUT',
        path: '/api/users/{id}',
        handler: updateUser,
    },

    {
        method: 'DELETE',
        path: '/api/users/{id}',
        handler: deleteUser
    },

    {
        method: 'POST',
        path: '/api/search-email',
        handler: searchEmailHandler,
        options: {
            payload: {
                parse: true,
                allow: ['multipart/form-data', 'application/json'], 
                multipart: true,  
                maxBytes: 10 * 1024 * 1024, 
                output: 'stream' 
            }
        }
    }
]

export default routeUser;