import jwt from "jsonwebtoken";

export const verifyToken = async (request, h) => {
    const authHeader = request.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return h.response({ message: "Unauthorized" }).code(401).takeover();
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        request.auth = { credentials: decoded }; // bisa diakses di handler kalau mau
        return h.continue;
    } catch (err) {
        return h.response({ message: "Forbidden" }).code(403).takeover();
    }
};
