import { useEffect } from "react"
import { Navigate } from "react-router"

export default function Home() {

    const role = localStorage.getItem('role') !== 'admin';

    return role ? <ContainerHome/> : <Navigate to="/dashboard"/>;
}

function ContainerHome() {
    
    return <h2>INI ADALAH HALAMAN HOME</h2>
}