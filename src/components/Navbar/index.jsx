import "./navbar.css";
import { useAuth } from "../../contexts/AuthContext";

export function Navbar() {
    const { logout } = useAuth();

    return (
        <header className="navbar">
            <div>Nome do aplicativo</div>
            <button className="close" onClick={logout}>X</button>
        </header>
    );
}