import { instance } from './index';

class Users {
    
    static async AuthLogin(data) {
        try {
            const res = await instance.post('/login', data, {
                withCredentials: true
            });
            return res.data;
        } catch (err) {
            return err;
        }
    }

    static async Register(data) {
        try {
            const res = await instance.post('/user', data);
            return res.data;
        } catch(err) {
            return err;
        }
    }
}


export default Users;