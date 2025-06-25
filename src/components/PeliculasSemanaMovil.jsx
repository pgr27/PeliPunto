import React, { useEffect, useState } from "react";
import { obtenerTrailer } from "../tmdbService";

function PeliculasSemanaMovil({ peliculas }) {
  const [trailers, setTrailers] = useState({});

  useEffect(() => {
    async function cargarTodosLosTrailers() {
      const nuevosTrailers = {};

      for (const peli of peliculas) {
        try {
          const url = await obtenerTrailer(peli.id);
          nuevosTrailers[peli.id] = url || null;
        } catch {
          nuevosTrailers[peli.id] = null;
        }
      }

      setTrailers(nuevosTrailers);
    }

    if (peliculas.length > 0) {
      cargarTodosLosTrailers();
    }
  }, [peliculas]);

  return (
    <div className="lista-peliculas solo-movil" style={{ padding: "1rem" }}>
      {peliculas.map((pelicula) => (
        <div
          key={pelicula.id}
          className="ficha-pelicula"
          style={{ cursor: trailers[pelicula.id] ? "pointer" : "default" }}
          onClick={() =>
            trailers[pelicula.id] &&
            window.open(trailers[pelicula.id], "_blank")
          }
        >
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
          </div>
        </div>
      ))}
    </div>
  );
}

export default PeliculasSemanaMovil;
