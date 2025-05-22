import { Users, Roles } from "../models/auth-model.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const serviceGetUser = async () => {
    const dataUser = await Users.findAll()
    return dataUser
}

export const RegisterServices = async (name, email, password, confPassword) => {
    const user = await Users.findOne({
        where: {
            email: email
        }
    });
    if (user) {
        throw new Error("User sudah ada");
    }
    if (password !== confPassword) {
        throw new Error("Password dan konfirmasi password tidak sama");
    }
    const salt = await bcrypt.genSalt();
    const hashpassword = await bcrypt.hash(password, salt);
    const newUser = await Users.create({
        name: name,
        email: email,
        roleId: 2,
        password: hashpassword
    });

    return newUser;
};

export const LoginService = async (email, password) => {
    const user = await Users.findOne({
        where: { email },
        include: {
            model: Roles,
            as: 'role',
            attributes: ['name']
        }
    });

    if (!user) {
        throw new Error("Email tidak ditemukan");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw new Error("Password salah");
    }
    const roles = user.role.name;

    const userID = user.id;
    const name = user.name;

    const accessToken = jwt.sign({ userID, name, email, roles }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "20s"
    });

    const refreshToken = jwt.sign({ userID, name, email, roles }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "1d"
    });

    await Users.update({ refresh_token: refreshToken }, { where: { id: userID } });

    return { accessToken, refreshToken, roles };
};


export const refreshTokenServise = async (refreshToken) => {
    const user = await Users.findAll({
        where: {
            refresh_token: refreshToken
        }
    });

    if (!user[0]) {
        throw new Error("Forbidden");
    }

    return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            throw new Error("Forbidden");
        }

        const userID = user[0].id;
        const name = user[0].name;
        const email = user[0].email;

        const accessToken = jwt.sign({ userID, name, email }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '15s'
        });

        return accessToken;
    });
}

