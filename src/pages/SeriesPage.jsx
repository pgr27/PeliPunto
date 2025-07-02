import { useEffect, useState } from "react";
import {
  obtenerSeriesSemana,
  obtenerSeriesPorGenero,
  obtenerTrailerSerie,
} from "../tmdbService";
import "../App.css";

function SeriesPage() {
  const [seriesSemana, setSeriesSemana] = useState([]);
  const [seriesPorGenero, setSeriesPorGenero] = useState({});
  const [trailers, setTrailers] = useState({});

  const generos = [
    "accion",
    "animacion",
    "ciencia ficción",
    "comedia",
    "crimen",
    "romance",
    "terror",
  ];

  useEffect(() => {
    async function cargarSeries() {
      const semana = await obtenerSeriesSemana();
      setSeriesSemana(semana.slice(0, 8));

      const nuevosGeneros = {};
      const nuevosTrailers = {};

      for (let genero of generos) {
        const series = await obtenerSeriesPorGenero(genero);
        nuevosGeneros[genero] = series.slice(0, 8);

        for (let serie of series.slice(0, 8)) {
          try {
            const url = await obtenerTrailerSerie(serie.id);
            nuevosTrailers[serie.id] = url;
          } catch {
            nuevosTrailers[serie.id] = null;
          }
        }
      }

      setSeriesPorGenero(nuevosGeneros);
      setTrailers(nuevosTrailers);
    }

    cargarSeries();
  }, []);

  const manejarClic = (id) => {
    const url = trailers[id];
    if (url) {
      window.open(url, "_blank");
    } else {
      alert("Tráiler no disponible 😢");
    }
  };

  const renderCarrusel = (titulo, lista) => (
    <div className="carrusel-contenedor">
      <h4 className="texto-banners mb-3">{titulo}</h4>
      <div className="carrusel-scroll">
        {lista.map((serie) => (
          <img
            key={serie.id}
            className="carrusel-poster"
            src={`https://image.tmdb.org/t/p/w300${serie.poster_path}`}
            alt={serie.name}
            title="Haz clic para ver el tráiler"
            onClick={() => manejarClic(serie.id)}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <div>
        <h1 className="titulo-peli-punto mb-4">📺 Series</h1>
        {renderCarrusel("📅 Recomendaciones de la Semana", seriesSemana)}
        {generos.map((genero) =>
          seriesPorGenero[genero]?.length > 0 ? (
            <div key={genero}>
              {renderCarrusel(
                `🎞️ ${capitalize(genero)}`,
                seriesPorGenero[genero]
              )}
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}

function capitalize(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

export default SeriesPage;
