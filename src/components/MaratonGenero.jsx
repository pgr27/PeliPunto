import { useEffect, useState } from "react";
import { obtenerPeliculasPorGenero } from "../tmdbService";

function MaratonGenero({ genero }) {
  const [peliculas, setPeliculas] = useState([]);
  const [vistas, setVistas] = useState(() => {
    const guardado = localStorage.getItem("pelisVistas");
    return guardado ? JSON.parse(guardado) : {};
  });

  useEffect(() => {
    localStorage.setItem("pelisVistas", JSON.stringify(vistas));
  }, [vistas]);

  const alternarVista = (id) => {
    setVistas((estadoActual) => ({
      ...estadoActual,
      [id]: !estadoActual[id],
    }));
  };

  useEffect(() => {
    async function cargarPeliculas() {
      const pelis = await obtenerPeliculasPorGenero(genero);
      setPeliculas(pelis);
    }
    cargarPeliculas();
  }, [genero]);

  return (
    <div>
      <h1>
        {" "}
        🌟Maratón de {genero.charAt(0).toUpperCase() + genero.slice(1)}🌟
      </h1>
      <div className="lista-peliculas">
        {peliculas.map((pelicula) => (
          <div key={pelicula.id} className="ficha-pelicula ">
            <img
              src={
                pelicula.poster_path
                  ? `https://image.tmdb.org/t/p/w200${pelicula.poster_path}`
                  : "/no-image.jpg"
              }
              alt={`Póster de ${pelicula.title}`}
              style={{ width: "130px", borderRadius: "4px" }}
            />
            <div style={{ flex: 1 }}>
              <h3>{pelicula.title}</h3>
              <p>
                Año:{" "}
                {pelicula.release_date
                  ? pelicula.release_date.split("-")[0]
                  : "Desconocido"}
              </p>
              <button
                onClick={() => alternarVista(pelicula.id)}
                className={`botones-genericos ${
                  vistas[pelicula.id] ? "visto" : "pendiente"
                }`}
                style={{ marginTop: "0.5rem" }}
              >
                {vistas[pelicula.id] ? "✅ Visto" : "⏳ Pendiente de ver"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MaratonGenero;
