import { FiSettings } from "react-icons/fi";

export function Navbar() {
  return (
    <nav className="w-full bg-[#009688] flex flex-col items-center pb-4 pt-4 relative z-20">
      <div className="flex items-center justify-between w-full px-6">
        <div className="w-6" /> {/* Espaço para alinhar o ícone */}
        <span className="text-white font-bold text-3xl tracking-wide select-none">BusTrack</span>
        <button className="text-white text-2xl">
          <FiSettings />
        </button>
      </div>
      {/* Barra de busca */}
      <div className="w-[90%] max-w-[370px] mt-4 flex items-center bg-white rounded-2xl shadow px-4 h-11">
        <svg
          width="20"
          height="20"
          fill="none"
          stroke="#009688"
          strokeWidth="2"
          className="mr-2"
          viewBox="0 0 24 24"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          placeholder="Pesquisar"
          className="border-none outline-none text-base bg-transparent w-full text-gray-800"
        />
      </div>
    </nav>
  );
}