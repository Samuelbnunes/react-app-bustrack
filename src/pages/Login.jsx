import React, { useState } from "react";
import { signIn } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import logoMinVerde from "../assets/logoMinVerde.svg";

const EyeIcon = ({ open }) => (
  open ? (
    <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path stroke="#184C4C" strokeWidth="2" d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z"/><circle cx="12" cy="12" r="3" stroke="#184C4C" strokeWidth="2"/></svg>
  ) : (
    <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path stroke="#184C4C" strokeWidth="2" d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z"/><circle cx="12" cy="12" r="3" stroke="#184C4C" strokeWidth="2"/><path stroke="#184C4C" strokeWidth="2" d="M4 4l16 16"/></svg>
  )
);

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [erro, setErro] = useState("");
  const [salvarPassword, setSalvarPassword] = useState(false);
  const [manterConectado, setManterConectado] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
try {
      const token = await signIn(email, password);
      sessionStorage.setItem('token', token);
      login(token);
      navigate("/map");
    } catch (err) {
      setErro(err.message);
    }
  };

  return (
    <div className="w-full h-full min-h-[800px] flex flex-col items-center justify-center bg-gradient-to-b from-white to-[#10A39E]">
      <div className="flex flex-col items-center w-full max-w-[340px] mx-auto h-full">
        <img
          src={logoMinVerde}
          alt="BusTrack Logo Minimalista Verde"
          className="w-[180px] h-[60px] mx-auto mt-[5.3rem] mb-10"
        />
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col flex-1 gap-5 justify-between h-full"
          autoComplete="off"
          style={{ minHeight: "500px" }}
        >
          <div className="flex flex-col gap-5">
            <input
              className="w-full rounded-2xl px-6 py-4 bg-[#eaf3ff] text-black placeholder:text-[#8CA6A6] text-base font-medium shadow focus:outline-none"
              placeholder="Insira Seu Email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="relative w-full">
              <input
                className="w-full rounded-2xl px-6 py-4 pr-12 bg-[#eaf3ff] text-black placeholder:text-[#8CA6A6] text-base font-medium shadow focus:outline-none"
                placeholder="Insira Sua senha:"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute right-4 top-1/2 -translate-y-1/2"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              >
                <EyeIcon open={showPassword} />
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <label className="flex items-center text-[#184C4C] text-base font-medium">
                Salvar password
                <input
                  type="checkbox"
                  className="ml-2 w-5 h-5 accent-[#10A39E] rounded"
                  checked={salvarPassword}
                  onChange={e => setSalvarPassword(e.target.checked)}
                />
              </label>
              <label className="flex items-center text-[#184C4C] text-base font-medium">
                Manter-me conectado
                <input
                  type="checkbox"
                  className="ml-2 w-5 h-5 accent-[#10A39E] rounded"
                  checked={manterConectado}
                  onChange={e => setManterConectado(e.target.checked)}
                />
              </label>
            </div>
            {erro && (
              <p className="text-red-600 text-center text-sm">{erro}</p>
            )}
          </div>
          <div className="flex flex-col gap-5 mb-10">
            <button
              type="submit"
              className="w-full rounded-2xl bg-[#184C4C] text-white text-lg font-semibold py-3 shadow-lg transition hover:bg-[#146060]"
            >
              Entrar
            </button>
            <Link
              to="/register"
              className="w-full rounded-2xl bg-white text-[#184C4C] text-lg font-semibold py-3 text-center shadow border border-[#e6f6f5] hover:bg-[#f2fdfd] transition"
            >
              Não tem uma conta?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}