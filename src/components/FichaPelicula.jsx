import { useFav } from "../context/FavProvider";

export default function FichaPelicula({ item, isPelicula }) {
  const {
    alternarFavoritoPeliculas,
    favoritosPeliculas,
    alternarFavoritosSeries,
    favoritosSeries,
  } = useFav();

  const esPeliculaFavorita = favoritosPeliculas.some((p) => p.id === item.id);
  const esSerieFavorita = favoritosSeries.some((s) => s.id === item.id);

  const esFavorita = isPelicula ? esPeliculaFavorita : esSerieFavorita;
  const alternarFavorito = isPelicula
    ? () => alternarFavoritoPeliculas(item)
    : () => alternarFavoritosSeries(item);

  return (
    <div className="ficha-pelicula">
      if (!item || !item.id) return null;
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
        <button className="botones-genericos" onClick={alternarFavorito}>
          {esFavorita ? "❤️ Quitar de favoritos" : "🤍 Añadir a favoritos"}
        </button>
      </div>
    </div>
  );
}
