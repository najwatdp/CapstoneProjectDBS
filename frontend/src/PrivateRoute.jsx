import { Navigate } from "react-router";
<<<<<<< HEAD
import Cookie from "./API/accessCookie";
import LoadingSpinner from "./Animation Loading/loadingSpinner";
=======
>>>>>>> 3f4a61f6e2b69bff9679b971d64ed27a5c86513f

export default function PrivateRoute({ children }) {

    const [isSuccess, setSuccess] = useState(null);

    async function getCookie() {
        try {
            const res = await Cookie.getCookie();
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