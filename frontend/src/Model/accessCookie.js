import { instance } from "./index";


class Cookie {

    static async getCookie() {
        const res = await instance.get('/token', {
            withCredentials: true
        });

        return res.data;
    }
}



export default Cookie;