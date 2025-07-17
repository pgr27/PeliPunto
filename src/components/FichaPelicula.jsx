import { useFav } from "../context/FavProvider";
import customLog from "../utils/Logger";

export default function FichaPelicula({ item, isPelicula }) {
  if (!item || !item.id)
    return <p className="h1">No hay información disponible</p>;
  const {
    alternarFavoritoPeliculas,
    favoritosPeliculas,
    alternarFavoritosSeries,
    favoritosSeries,
  } = useFav();

  const esPeliculaFavorita = favoritosPeliculas.some((p) => p.id === item.id);
  const esSerieFavorita = favoritosSeries.some((s) => s.id === item.id);

  const esFavorita = isPelicula ? esPeliculaFavorita : esSerieFavorita;
  const alternarFavorito = () => {
    if (isPelicula) {
      alternarFavoritoPeliculas(item);
    } else {
      alternarFavoritosSeries(item);
    }
  };
  const alternTest = () => {
    customLog("Alternando favorito para:", item);
    customLog("ISPELICULA:", isPelicula);
    alternarFavorito();
  };

  return (
    <div className="ficha-pelicula">
      {item.poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
          alt={`Póster de ${item.title || item.name}`}
          style={{ width: "100px", borderRadius: "4px" }}
        />
      )}
      <div>
        <h3>{item.title || item.name}</h3>
        <p>
          Año:{" "}
          {item.release_date || item.first_air_date
            ? (item.release_date || item.first_air_date).split("-")[0]
            : "Desconocido"}
        </p>
        <p>{item.overview || "Sin descripción disponible."}</p>
        <button className="botones-genericos" onClick={alternTest}>
          {esFavorita ? "❤️ Quitar de favoritos" : "🤍 Añadir a favoritos"}
        </button>
      </div>
    </div>
  );
}
