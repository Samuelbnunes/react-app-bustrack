import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../services/authService";
import logoMin from "../assets/logoMin.svg";

const EyeIcon = ({ open }) => (
  open ? (
    <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path stroke="#184C4C" strokeWidth="2" d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z"/><circle cx="12" cy="12" r="3" stroke="#184C4C" strokeWidth="2"/></svg>
  ) : (
    <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path stroke="#184C4C" strokeWidth="2" d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z"/><circle cx="12" cy="12" r="3" stroke="#184C4C" strokeWidth="2"/><path stroke="#184C4C" strokeWidth="2" d="M4 4l16 16"/></svg>
  )
);

export function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [aceitarTermos, setAceitarTermos] = useState(false);
    const [notificacoes, setNotificacoes] = useState(false);
    const [erro, setErro] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro("");
        if (password !== confirmPassword) {
            setErro("As senhas não coincidem.");
            return;
        }
        if (!aceitarTermos) {
            setErro("Você precisa aceitar os termos.");
            return;
        }
        try {
            await signUp(name, email, password);
            navigate("/login");
        } catch (err) {
            setErro(err.message);
        }
    };

    return (
        <div className="w-full h-full min-h-[800px] flex flex-col items-center justify-center bg-gradient-to-b from-[#10A39E] to-[#e6f6f5]">
            <div className="flex flex-col items-center w-full max-w-[340px] mx-auto h-full">
                <img
                    src={logoMin}
                    alt="BusTrack Logo Minimalista"
                    className="w-[180px] h-[60px] mx-auto mt-[5.3rem] mb-10"
                />
                <form
                    onSubmit={handleSubmit}
                    className="w-full flex flex-col flex-1"
                    autoComplete="off"
                >
                    <div className="flex flex-col gap-5 flex-1">
                        <input
                            className="w-full rounded-2xl px-6 py-4 bg-white text-[#10A39E] placeholder:text-[#8CA6A6] text-base font-medium shadow focus:outline-none"
                            placeholder="Insira Seu Nome"
                            type="text"
                            required
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        <input
                            className="w-full rounded-2xl px-6 py-4 bg-[#eaf3ff] text-black placeholder:text-[#8CA6A6] text-base font-medium shadow focus:outline-none"
                            placeholder="Insira Seu Email"
                            type="email"
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <div className="relative w-full">
                            <input
                                className="w-full rounded-2xl px-6 py-4 pr-12 bg-[#eaf3ff] text-black placeholder:text-[#8CA6A6] text-base font-medium shadow focus:outline-none"
                                placeholder="Insira Sua senha:"
                                type={showPassword ? "text" : "password"}
                                required
                                value={password}
                                onChange={e => setPassword(e.target.value)}
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
                        <div className="relative w-full">
                            <input
                                className="w-full rounded-2xl px-6 py-4 pr-12 bg-white text-[#10A39E] placeholder:text-[#8CA6A6] text-base font-medium shadow focus:outline-none"
                                placeholder="Confirme sua senha:"
                                type={showConfirmPassword ? "text" : "password"}
                                required
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                tabIndex={-1}
                                className="absolute right-4 top-1/2 -translate-y-1/2"
                                onClick={() => setShowConfirmPassword((v) => !v)}
                                aria-label={showConfirmPassword ? "Ocultar senha" : "Mostrar senha"}
                            >
                                <EyeIcon open={showConfirmPassword} />
                            </button>
                        </div>

                        <div className="flex flex-col gap-2 mt-2 mb-2">
                            <label className="flex items-center text-[#184C4C] text-base font-medium">
                                Aceitar Termos
                                <input
                                    type="checkbox"
                                    className="ml-2 w-5 h-5 accent-[#10A39E] rounded"
                                    checked={aceitarTermos}
                                    onChange={e => setAceitarTermos(e.target.checked)}
                                />
                            </label>
                            <label className="flex items-center text-[#184C4C] text-base font-medium">
                                Receber Notificações
                                <input
                                    type="checkbox"
                                    className="ml-2 w-5 h-5 accent-[#10A39E] rounded"
                                    checked={notificacoes}
                                    onChange={e => setNotificacoes(e.target.checked)}
                                />
                            </label>
                        </div>

                        {erro && <p className="text-red-600 text-center text-sm">{erro}</p>}
                    </div>
                    <div style={{ height: "1.25rem" }}></div>
                    <button
                        type="submit"
                        className="w-full rounded-2xl bg-[#184C4C] text-white text-lg font-semibold py-3 shadow-lg transition hover:bg-[#146060]"
                    >
                        Concluir
                    </button>
                    <Link
                        to="/login"
                        className="w-full mt-5 rounded-2xl bg-white text-[#184C4C] text-lg font-semibold py-3 text-center shadow border border-[#e6f6f5] hover:bg-[#f2fdfd] transition mb-10"
                    >Entrar
                    </Link>
                </form>
            </div>
        </div>
    );
}