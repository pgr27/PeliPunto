import { useFav } from "../context/FavProvider";

function FichaPelicula({ pelicula }) {
  const { alternarFavorito, favoritos } = useFav();
  const esFavorita = favoritos.some((fav) => fav.id === pelicula.id);

  const imagenUrl = pelicula.poster_path
    ? `https://image.tmdb.org/t/p/w300${pelicula.poster_path}`
    : "https://via.placeholder.com/300x450?text=Sin+imagen";

  return (
    <div className="ficha-pelicula">
      <img
        src={imagenUrl}
        alt={`Póster de ${pelicula.title}`}
        style={{ width: "100px", borderRadius: "4px" }}
      />
      <div>
        <h3>{pelicula.title}</h3>
        <p>
          Año:{" "}
          {pelicula.release_date
            ? pelicula.release_date.split("-")[0]
            : "Desconocido"}
        </p>
        <p>{pelicula.overview || "Sin descripción disponible."}</p>
        <button
          className="botones-genericos"
          onClick={() => alternarFavorito(pelicula)}
        >
          {esFavorita ? "❤️ Quitar de favoritos" : "🤍 Añadir a favoritos"}
        </button>
      </div>
    </div>
  );
}

export default FichaPelicula;
