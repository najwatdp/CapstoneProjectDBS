import { instance } from './index';

class Users {

    static async AuthLogin(data) {
        const res = await instance.post('/login', data, {
            withCredentials: true
        });
        return res.data;
    }

    static async Register(data) {
        const res = await instance.post('/user', data);
        return res.data;
    }

    static async getUser(token) {
        const res = await instance.get('/user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return res.data;
    }
}


export default Users;