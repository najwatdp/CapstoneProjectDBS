import { Navigate } from "react-router";

export default function PrivateRoute({ children }) {

    return isAuthecticated() ? children : <Navigate to="/login" />;
}

function isAuthecticated() {
    return localStorage.getItem('token') !== null;
}