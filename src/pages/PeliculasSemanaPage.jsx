import React, { useEffect, useState } from "react";
import { obtenerPeliculasSemana } from "../tmdbService";
import PeliculasSemanaMovil from "../components/PeliculasSemanaMovil";

function PeliculasSemanaPage() {
  const [peliculas, setPeliculas] = useState([]);

  useEffect(() => {
    async function cargarPeliculas() {
      try {
        const data = await obtenerPeliculasSemana(); // devuelve array directo
        setPeliculas(data.slice(0, 12)); // muestra 12 primeras
      } catch (error) {
        console.error("Error al cargar películas de la semana:", error);
      }
    }

    cargarPeliculas();
  }, []);

  return (
    <div className="app-contenedor">
      <h1 className="titulo-peli-punto">🎬 Películas de la Semana</h1>

      {/* Versión escritorio: lista de fichas visuales */}
      <div className="lista-peliculas solo-escritorio">
        {peliculas.map((pelicula) => (
          <div key={pelicula.id} className="ficha-pelicula">
            <img
              src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`}
              alt={pelicula.title}
              style={{
                width: "100px",
                borderRadius: "8px",
                objectFit: "cover",
              }}
            />
            <h2 style={{ fontSize: "1rem", margin: 0 }}>{pelicula.title}</h2>
          </div>
        ))}
      </div>

      {/* Versión móvil: lista interactiva con tráilers */}
      <PeliculasSemanaMovil peliculas={peliculas} />
    </div>
  );
}

export default PeliculasSemanaPage;
