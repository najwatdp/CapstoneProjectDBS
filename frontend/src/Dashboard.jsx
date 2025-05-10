import { Navigate } from "react-router";


export default function Dashboard() {

    const role = localStorage.getItem('role') !== "user";

    return role ? <ContainerDashboard /> : <Navigate to="/" />; 
}

function ContainerDashboard() {

    return <h2>Ini adalah halamn dashboard</h2>
}
