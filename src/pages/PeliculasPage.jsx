import { useEffect, useState } from "react";
import {
  obtenerPeliculasSemana,
  obtenerPeliculasPorGenero,
  obtenerTrailer,
} from "../tmdbService";
import "../App.css";
import "reactjs-popup/dist/index.css";
import ModalFicha from "../components/ModalFicha";

function PeliculasPage() {
  const [peliculasSemana, setPeliculasSemana] = useState([]);
  const [peliculasPorGenero, setPeliculasPorGenero] = useState({});
  const [trailers, setTrailers] = useState({});
  const [modalAbierto, setModalAbierto] = useState(false);
  const [contenidoSeleccionado, setContenidoSeleccionado] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState(null);
  const manejarClic = async (item) => {
    setContenidoSeleccionado(item);
    const url = await obtenerTrailer(item.id); // usa tu función ya existente
    setTrailerUrl(url);
    setModalAbierto(true);
  };
  const generos = [
    "accion",
    "aventura",
    "animacion",
    "ciencia ficción",
    "comedia",
    "crimen",
    "musical",
    "romance",
    "terror",
  ];

  useEffect(() => {
    async function cargarPeliculas() {
      const semana = await obtenerPeliculasSemana();
      setPeliculasSemana(semana.slice(0, 8));

      const nuevosGeneros = {};
      const nuevosTrailers = {};

      for (let genero of generos) {
        const peliculas = await obtenerPeliculasPorGenero(genero);
        nuevosGeneros[genero] = peliculas.slice(0, 8);

        for (let peli of peliculas.slice(0, 8)) {
          try {
            const url = await obtenerTrailer(peli.id);
            nuevosTrailers[peli.id] = url;
          } catch {
            nuevosTrailers[peli.id] = null;
          }
        }
      }

      setPeliculasPorGenero(nuevosGeneros);
      setTrailers(nuevosTrailers);
    }

    cargarPeliculas();
  }, []);

  const renderCarrusel = (titulo, lista) => (
    <div className="carrusel-contenedor">
      <h4 className="texto-banners mb-3">{titulo}</h4>
      <div className="carrusel-scroll">
        {lista.map((pelicula, index) => (
          <img
            key={pelicula.id || `${pelicula.title}-${index}`}
            className="carrusel-poster"
            src={`https://image.tmdb.org/t/p/w300${pelicula.poster_path}`}
            alt={pelicula.title}
            title="Haz clic para ver el tráiler"
            onClick={() => manejarClic(pelicula)}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <h1>🍿 Películas</h1>
      {renderCarrusel("📅 Recomendaciones de la Semana", peliculasSemana)}
      {generos.map((genero) =>
        peliculasPorGenero[genero]
          ? renderCarrusel(
              `🎞️ ${capitalize(genero)}`,
              peliculasPorGenero[genero]
            )
          : null
      )}
      <ModalFicha
        abierto={modalAbierto}
        onCerrar={() => setModalAbierto(false)}
        contenido={contenidoSeleccionado}
        trailerUrl={trailerUrl}
        isPelicula={true}
      />
    </div>
  );
}
function capitalize(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}
export default PeliculasPage;
