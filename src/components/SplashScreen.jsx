import React from "react";
import logo from "../assets/logo.svg";

export function SplashScreen() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#10A39E]">
      <div className="flex-1 flex flex-col items-center justify-center">
        <img src={logo} alt="BusTrack Logo" className="w-[140px] h-[210px] mb-4" />
      </div>
      <div className="mb-8 text-center">
        <span className="text-white text-base">Pré-Alpha<br />1.0</span>
      </div>
    </div>
  );
}