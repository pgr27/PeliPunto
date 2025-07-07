import { useFav } from "../context/FavProvider";
import FichaPelicula from "../components/FichaPelicula";
import { Link } from "react-router-dom";

export default function Fav() {
  const { favoritos } = useFav();

  if (favoritos.length === 0) {
    return (
      <div>
        <p className="mensaje-favoritos">No tienes películas en favoritos.</p>
        <Link to="/" className="botones-genericos">
          🡰 Pagina Principal
        </Link>
      </div>
    );
  }

  return (
    <section>
      <h1>¡TE HAN ENCANTADO!</h1>
      <h1>🔥🔥🔥🔥🔥🔥</h1>
      <div class="grid-contenedor">
        <div class="grid-item">
          <h2>Tus películas favoritas</h2>{" "}
          <div className="lista-peliculas">
            {favoritos.map((pelicula) => (
              <FichaPelicula key={pelicula.id} pelicula={pelicula} />
            ))}
          </div>
        </div>
        <div class="grid-item">
          <h2>Tus series favoritas</h2>{" "}
          <div className="lista-peliculas">
            {favoritos.map((pelicula) => (
              <FichaPelicula key={pelicula.id} pelicula={pelicula} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
