import { useState } from "react";
import MaratonGenero from "../components/MaratonGenero";

const generos = [
  { nombre: "accion", emoji: "🔥" },
  { nombre: "comedia", emoji: "😂" },
  { nombre: "terror", emoji: "👻" },
  { nombre: "drama", emoji: "🎭" },
  { nombre: "romance", emoji: "💘" },
];

function Maratones() {
  const [generoSeleccionado, setGeneroSeleccionado] = useState(null);

  return (
    <div>
      <h1>🍿 Ponte cómodo 🍿</h1>
      <h2>¿Qué maratón quieres ver hoy?</h2>

      <div className="contenedor-botones-top">
        {generos.map(({ nombre, emoji }) => (
          <button
            key={nombre}
            onClick={() => setGeneroSeleccionado(nombre)}
            className="botones-genericos"
          >
            {emoji} {nombre.charAt(0).toUpperCase() + nombre.slice(1)}
          </button>
        ))}
      </div>

      {generoSeleccionado && <MaratonGenero genero={generoSeleccionado} />}
    </div>
  );
}

export default Maratones;
