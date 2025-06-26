import React, { useState } from "react";
import { Navbar, Logo, Title, Input, Button } from "../components";
import { signIn } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
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
    <div className="min-h-screen flex items-center justify-center bg-zinc-900">
      <div className="bg-zinc-800 rounded-2xl shadow-lg p-8 w-full max-w-md flex flex-col items-center">
        <Logo className="mb-4" />
        <h1 className="text-4xl font-bold text-white font-serif mb-1">Bustrack</h1>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-4">
            <Input
              label="Email"
              placeholder="Digite seu email..."
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl bg-zinc-700 text-white border-none focus:ring-2 focus:ring-zinc-500"
              labelClassName="text-zinc-300"
            />
          </div>
          <div className="mb-4">
            <Input
              label="Senha"
              placeholder="Digite sua senha..."
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-xl bg-zinc-700 text-white border-none focus:ring-2 focus:ring-zinc-500"
              labelClassName="text-zinc-300"
            />
          </div>
          {erro && <p className="text-red-400 text-sm mb-2">{erro}</p>}
          <Button
            type="submit"
            className="w-full py-3 rounded-xl bg-white text-zinc-900 font-semibold text-lg hover:bg-zinc-200 transition mb-2"
          >
            Entrar
          </Button>
        </form>
        <Link
          to="/register"
          className="text-zinc-400 hover:underline text-sm mt-4"
        >
          Criar conta
        </Link>
      </div>
    </div>
  );
}