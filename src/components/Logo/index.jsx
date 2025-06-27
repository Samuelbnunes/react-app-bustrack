import "./logo.css";
import logo from "../../assets/logo.svg";

export function Logo({ className = "" }) {
  return (
    <img
      src={logo}
      alt="Logotipo Savoir"
      className={`w-24 h-24 mb-4 ${className}`}
      draggable={false}
    />
  );
}