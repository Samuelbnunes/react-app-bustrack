import { useState } from "react";
import sushiImg from "../assets/sushi-passo-fundo.png";

export function SushiCard() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          background: "#23272f",
          borderRadius: 20,
          padding: 16,
          margin: "24px 0",
          cursor: "pointer",
          maxWidth: 500,
        }}
        onClick={() => setOpen(true)}
      >
        <img
          src={sushiImg}
          alt="Sushi Passo Fundo"
          style={{
            width: 80,
            height: 80,
            objectFit: "cover",
            borderRadius: 12,
            marginRight: 16,
            background: "#111"
          }}
        />
        <div>
          <div style={{ fontWeight: "bold", fontSize: 22 }}>Sushi Passo Fundo</div>
          <div style={{ color: "#bbb", margin: "4px 0" }}>Japonês • 4.6 ★ • 0.7 mi</div>
        </div>
      </div>

      {open && (
        <div
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000
          }}
          onClick={() => setOpen(false)}
        >
          <div
            style={{
              background: "#23272f",
              borderRadius: 20,
              padding: 32,
              minWidth: 340,
              maxWidth: 400,
              color: "#fff",
              position: "relative"
            }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                background: "none",
                border: "none",
                color: "#fff",
                fontSize: 22,
                cursor: "pointer"
              }}
              aria-label="Fechar"
            >×</button>
            <img
              src={sushiImg}
              alt="Sushi Passo Fundo"
              style={{
                width: "100%",
                height: 160,
                objectFit: "cover",
                borderRadius: 12,
                marginBottom: 16,
                background: "#111"
              }}
            />
            <div style={{ fontWeight: "bold", fontSize: 24, marginBottom: 4 }}>Sushi Passo Fundo</div>
            <div style={{ color: "#ffd700", fontSize: 18, marginBottom: 8 }}>4.6 ★</div>
            <div style={{ color: "#bbb", marginBottom: 16 }}>
              O melhor sushi de Passo Fundo! Ambiente aconchegante, ingredientes frescos e uma experiência japonesa autêntica.
            </div>
            <div style={{ fontWeight: "bold", marginBottom: 8 }}>Combos:</div>
            <ul style={{ paddingLeft: 20, marginBottom: 0 }}>
              <li>Combo 1: 20 peças variadas - R$ 39,90</li>
              <li>Combo 2: 40 peças especiais - R$ 69,90</li>
              <li>Combo 3: 60 peças premium - R$ 99,90</li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}