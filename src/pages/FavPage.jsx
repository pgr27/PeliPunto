import { useFav } from "../context/FavProvider";
import FichaPelicula from "../components/FichaPelicula";

export default function Fav() {
  const { favoritosPeliculas, favoritosSeries } = useFav(); // ← ¡ahora sí ambas!

  const noHayFavoritos =
    favoritosPeliculas.length === 0 && favoritosSeries.length === 0;

  if (noHayFavoritos) {
    return (
      <div>
        <p className="h1">No tienes películas ni series en favoritos.</p>
      </div>
    );
  }

  return (
    <section>
      <h1>¡TE HAN ENCANTADO!</h1>
      <h1>🔥🔥🔥🔥🔥🔥</h1>
      <div className="grid-contenedor">
        {favoritosPeliculas.length > 0 && (
          <div className="grid-item">
            <h2>Tus películas favoritas</h2>
            <div className="lista-peliculas">
              {favoritosPeliculas.map((pelicula) => (
                <FichaPelicula
                  key={pelicula.id}
                  item={pelicula}
                  isPelicula={true}
                />
              ))}
            </div>
          </div>
        )}
        {favoritosSeries.length > 0 && (
          <div className="grid-item">
            <h2>Tus series favoritas</h2>
            <div className="lista-peliculas">
              {favoritosSeries.map((serie) => (
                <FichaPelicula key={serie.id} item={serie} isPelicula={false} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
