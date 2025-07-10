import { useFav } from "../context/FavProvider";
import FichaPelicula from "../components/FichaPelicula";
import { Link } from "react-router-dom";

export default function Fav() {
  const { favoritosPeliculas } = useFav();

  if (favoritosPeliculas.length === 0) {
    return (
      <div>
        <p className="mensaje-favoritos">No tienes películas en favoritos.</p>
      </div>
    );
  }

  return (
    <section>
      <h1>¡TE HAN ENCANTADO!</h1>
      <h1>🔥🔥🔥🔥🔥🔥</h1>
      <div className="grid-contenedor">
        <div className="grid-item">
          <h2>Tus películas favoritas</h2>{" "}
          <div className="lista-peliculas">
            {favoritosPeliculas.map((pelicula) => (
              <FichaPelicula key={pelicula.id} pelicula={pelicula} />
            ))}
          </div>
        </div>
        <div className="grid-item">
          <h2>Tus series favoritas</h2>{" "}
          <div className="lista-peliculas">
            {favoritosPeliculas.map((pelicula) => (
              <FichaPelicula key={pelicula.id} pelicula={pelicula} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
