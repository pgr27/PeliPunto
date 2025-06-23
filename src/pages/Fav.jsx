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
      <h1 className="titulo-peli-punto">¡Épicas! 🔥</h1>
      <div className="lista-peliculas">
        {favoritos.map((pelicula) => (
          <FichaPelicula key={pelicula.id} pelicula={pelicula} />
        ))}
      </div>
    </section>
  );
}
