import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { obtenerPeliculasPorGenero } from "../tmdbService";

function MaratonGenero() {
  const { genero } = useParams();
  const [peliculas, setPeliculas] = useState([]);

  useEffect(() => {
    async function cargarPeliculas() {
      const pelis = await obtenerPeliculasPorGenero(genero);
      setPeliculas(pelis);
    }
    cargarPeliculas();
  }, [genero]);

  return (
    <div className="vistaMaraton">
      <h2>🎬 Maratón de {genero.charAt(0).toUpperCase() + genero.slice(1)}</h2>
      <ul className="listaPeliculas">
        {peliculas.map((peli) => (
          <li key={peli.id}>{peli.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default MaratonGenero;
