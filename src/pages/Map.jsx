import { useEffect, useState } from "react";
import { Navbar } from "../components";
import { GoogleMap, Marker, useJsApiLoader, InfoWindow } from "@react-google-maps/api";
import { getPoints, postPoint, deletePoint } from '../services/mapService';
import { useAuth } from "../contexts/AuthContext";

const containerStyle = {
  width: "100%",
  height: "100%",
};

export const Map = ({ center = { lat: -28.2628, lng: -52.4067 }, zoom = 13 }) => {
  const { token } = useAuth();
  const [markers, setMarkers] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [newPoint, setNewPoint] = useState(null);
  const [descricao, setDescricao] = useState("");
  const [nome, setNome] = useState(""); // Novo estado para o nome do ponto
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [open, setOpen] = useState(false);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    async function fetchMarkers() {
      try {
        const data = await getPoints(token);
        setMarkers(data);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchMarkers();
  }, [token]);

  // Ao clicar no mapa, abre o input para descrição
  const handleMapClick = (event) => {
    setNewPoint({
      latitude: event.latLng.lat(),
      longitude: event.latLng.lng(),
    });
    setShowInput(true);
    setDescricao("");
    setNome(""); // Limpa o nome ao abrir o input
    setIsEditing(false);
    setSelectedMarker(null);
  };

  // Confirma o cadastro do ponto
  const handleAddPoint = async () => {
    if (!descricao.trim() || !nome.trim()) return;
    const pointData = {
      name: nome,
      description: descricao,
      latitude: newPoint.latitude,
      longitude: newPoint.longitude,
    };
    try {
      const savedPoint = await postPoint(token, pointData);
      const savedMarker = {
        id: savedPoint.id,
        title: savedPoint.name || "Novo Ponto",
        description: savedPoint.description,
        position: {
          lat: savedPoint.latitude,
          lng: savedPoint.longitude,
        },
      };
      setMarkers((prev) => [...prev, savedMarker]);
      setShowInput(false);
      setDescricao("");
      setNome("");
      setNewPoint(null);
    } catch (error) {
      alert(error.message);
    }
  };

  // Ao clicar no marcador, mostra a descrição
  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
    setShowInput(false);
    setIsEditing(false);
  };

  // Inicia edição da descrição
  const handleEditDescription = () => {
    setDescricao(selectedMarker.description || selectedMarker.title);
    setNome(selectedMarker.title || "");
    setIsEditing(true);
    setShowInput(true);
    setNewPoint({
      latitude: selectedMarker.position.lat,
      longitude: selectedMarker.position.lng,
      id: selectedMarker.id,
    });
  };

  // Salva edição da descrição
  const handleSaveEdit = async () => {
    if (!descricao.trim() || !nome.trim()) return;
    // Atualiza no backend (reutilizando postPoint, mas ideal seria um put/patch)
    const pointData = {
      id: newPoint.id,
      name: nome,
      description: descricao,
      latitude: newPoint.latitude,
      longitude: newPoint.longitude,
    };
    try {
      await postPoint(token, pointData); // Troque por updatePoint se existir
      setMarkers((prev) =>
        prev.map((m) =>
          m.id === newPoint.id ? { ...m, title: nome, description: descricao } : m
        )
      );
      setShowInput(false);
      setIsEditing(false);
      setSelectedMarker((prev) => prev && { ...prev, title: nome, description: descricao });
      setDescricao("");
      setNome("");
      setNewPoint(null);
    } catch (error) {
      alert(error.message);
    }
  };

  // Excluir ponto
  const handleDeletePoint = async () => {
    if (!selectedMarker) return;
    if (!window.confirm("Tem certeza que deseja excluir este ponto?")) return;
    try {
      await deletePoint(token, selectedMarker.id);
      setMarkers((prev) => prev.filter((m) => m.id !== selectedMarker.id));
      setSelectedMarker(null);
    } catch (error) {
      alert(error.message);
    }
  };

  // Cancela input/edição
  const handleCancel = () => {
    setShowInput(false);
    setIsEditing(false);
    setDescricao("");
    setNome("");
    setNewPoint(null);
  };

  return (
    <>
      <Navbar />
      <div style={{ width: "100%", height: "100%", position: "relative" }}>
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={zoom}
            onClick={handleMapClick}
          >
            {markers.map(marker => (
              <Marker
                key={marker.id}
                position={marker.position}
                title={marker.title}
                onClick={() => handleMarkerClick(marker)}
              />
            ))}
            {selectedMarker && !showInput && (
              <InfoWindow
                position={selectedMarker.position}
                onCloseClick={() => setSelectedMarker(null)}
              >
                <div style={{ minWidth: 200 }}>
                  <div style={{ fontWeight: "bold", marginBottom: 8 }}>Nome:</div>
                  <div style={{ marginBottom: 8 }}>{selectedMarker.title}</div>
                  <div style={{ fontWeight: "bold", marginBottom: 8 }}>Descrição:</div>
                  <div style={{ marginBottom: 12 }}>{selectedMarker.description}</div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      onClick={handleEditDescription}
                      style={{
                        background: "#1976d2",
                        color: "#fff",
                        border: "none",
                        borderRadius: 4,
                        padding: "6px 12px",
                        cursor: "pointer"
                      }}
                    >
                      Editar ponto
                    </button>
                    <button
                      onClick={handleDeletePoint}
                      style={{
                        background: "#b71c1c",
                        color: "#fff",
                        border: "none",
                        borderRadius: 4,
                        padding: "6px 12px",
                        cursor: "pointer"
                      }}
                    >
                      Excluir ponto
                    </button>
                  </div>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        ) : (
          <div>Carregando mapa...</div>
        )}

        {/* Input para nome e descrição do ponto */}
        {showInput && (
          <div style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "#23272f",
            padding: 32,
            borderRadius: 12,
            zIndex: 20,
            color: "#fff",
            boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
            minWidth: 320,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}>
            <div style={{ fontSize: 20, fontWeight: "bold", marginBottom: 16 }}>
              {isEditing ? "Editar ponto" : "Adicionar novo ponto"}
            </div>
            <input
              type="text"
              value={nome}
              onChange={e => setNome(e.target.value)}
              placeholder="Digite o nome"
              style={{
                width: "100%",
                padding: 10,
                borderRadius: 6,
                border: "1px solid #444",
                marginBottom: 16,
                background: "#181a20",
                color: "#fff",
                fontSize: 16
              }}
              autoFocus
            />
            <input
              type="text"
              value={descricao}
              onChange={e => setDescricao(e.target.value)}
              placeholder="Digite a descrição"
              style={{
                width: "100%",
                padding: 10,
                borderRadius: 6,
                border: "1px solid #444",
                marginBottom: 24,
                background: "#181a20",
                color: "#fff",
                fontSize: 16
              }}
            />
            <div style={{ display: "flex", gap: 16, width: "100%", justifyContent: "center" }}>
              <button
                onClick={isEditing ? handleSaveEdit : handleAddPoint}
                style={{
                  background: "#43a047",
                  color: "#fff",
                  border: "none",
                  borderRadius: 6,
                  padding: "10px 24px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  fontSize: 16
                }}
              >
                Salvar
              </button>
              <button
                onClick={handleCancel}
                style={{
                  background: "#b71c1c",
                  color: "#fff",
                  border: "none",
                  borderRadius: 6,
                  padding: "10px 24px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  fontSize: 16
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
