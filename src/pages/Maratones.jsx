import { useNavigate } from "react-router-dom";
const generos = [
  { nombre: "accion", emoji: "🔥" },
  { nombre: "comedia", emoji: "😂" },
  { nombre: "terror", emoji: "👻" },
  { nombre: "drama", emoji: "🎭" },
  { nombre: "romance", emoji: "💘" },
]; //De esta forma pongo los emojis visualmente pero no en el valor

function Maratones() {
  const navigate = useNavigate();

  return (
    <div className="pantalla-maraton">
      <h1>🍿Ponte cómodo🍿</h1>
      <h2>¿Qué maratón quieres ver hoy? </h2>
      {generos.map(({ nombre, emoji }) => (
        <button
          key={nombre}
          onClick={() => navigate(`/maraton/${nombre}`)}
          className="botones-maratones"
        >
          {emoji} {nombre.charAt(0).toUpperCase() + nombre.slice(1)}
        </button>
      ))}
    </div>
  );
}

export default Maratones;
