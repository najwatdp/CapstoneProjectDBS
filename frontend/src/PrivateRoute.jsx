import { Navigate } from "react-router";

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