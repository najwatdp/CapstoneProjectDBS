import { instance } from "./index";

export const cookie = async () => {
    const res = await instance.get('/cookie', {
        withCredentials: true
    });
    return res.data;
}