import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { cookie } from "./API/accessCookie";
import LoadingBerputar from "./Animation Loading/LoadingBerputar";
import LoadingSpinner from "./Animation Loading/loadingSpinner";

export default function PrivateRoute({ children }) {

    const [isSuccess, setSuccess ] = useState(null);

    async function getCookie() {
        try {
            const res = await cookie();
            setSuccess(true);
        } catch (err) {
            setSuccess(false);
        }
    }
    useEffect(() => {
        getCookie();
    })

    if (isSuccess === null) {
        return <LoadingSpinner Width={20} Height={2} />
    }

    return isSuccess ? children : <Navigate to="/login" />;
}