import {LoginService, RegisterServices, serviceGetUser } from "../services/auth-service.js";
import { refreshTokenServise } from "../services/auth-service.js";

export const getUser = async (request, h) => {
    const response = await serviceGetUser();
    return h.response({
        status: 'success',
        data: response
    }).code(200);
};



export const Register = async(request, h) => {
    try {
        const { name, email, password, confPassword } = request.payload;
        const response = await RegisterServices(name, email, password, confPassword);

        return h.response({
            status: "success",
            msg: "Registrasi Berhasil",
            data: response
        }).code(201);
    } catch (error) {
        console.error("Register error:", error.message); 
        return h.response({
            status: "fail",
            msg: error.message
        }).code(400);
    }
}



export const Login = async (request, h) => {
    try {
        const { email, password } = request.payload;
        const { refreshToken, accessToken } = await LoginService(email, password);

        return h.response({ accessToken }).state("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "Lax",
            path: "/",
            maxAge: 24 * 60 * 60 * 1000
        }).code(200);
    } catch (error) {
        return h.response({ msg: error.message }).code(400);
    }
};



export const Logout = async (request, h) => {
    const refreshToken = request.cookies.refreshToken
    if(!refreshToken){
        return h.response().code(204);
    }
    
    const user = await Users.findAll({
        where:{
            refresh_token: refreshToken
        }
    })
    if(!user[0]){
        return h.response().code(204);
    }

    const userID = user[0].id
    await Users.update({refresh_token:null}, {
        where: {
            id: userID
        }
    })
    h.response.clearCookie('refreshToken');
    return h.response().code(200)
}



export const refreshToken = async (request, h) => {
    const refreshToken = request.state.refreshToken;
    if (!refreshToken) {
        return h.response({ message: "Unauthorized" }).code(401);
    }

    try {
        const accessToken = await refreshTokenServise(refreshToken);
        return h.response({ accessToken });
    } catch (error) {
        return h.response({ message: error.message }).code(403);
    }
};
