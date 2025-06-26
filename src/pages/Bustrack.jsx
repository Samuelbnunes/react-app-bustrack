import React from "react";
import { Map } from "./Map";
import { SushiCard } from "../components/SushiCard";

const center = { lat: -28.2628, lng: -52.4067 };

export default function Bustrack() {
  return (
    <div className="min-h-screen bg-zinc-900 flex flex-col items-center py-8">
      <h1 className="text-3xl font-bold text-white mb-2 font-serif">Bustrack</h1>
      <span className="text-zinc-400 mb-6">Descubra novas experiências</span>
      <div className="w-full max-w-lg rounded-2xl overflow-hidden mb-8 shadow-lg" style={{ height: 400 }}>
        <Map center={center} zoom={13} />
      </div>
      <div className="w-full max-w-lg">
        <h2 className="text-white text-lg mb-4">Popular nas proximidades</h2>
        <div className="flex flex-col gap-4">
          {/* Substitua o bloco antigo pelo SushiCard */}
          <SushiCard />
        </div>
      </div>
    </div>
  );}