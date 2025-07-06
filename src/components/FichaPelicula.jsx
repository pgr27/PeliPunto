import { useFav } from "../context/FavProvider";

export default function FichaPelicula({ pelicula }) {
  const { alternarFavorito, favoritos } = useFav();
  const esFavorita = favoritos.some((fav) => fav.id === pelicula.id);

  return (
    <div className="ficha-pelicula">
      {/* 👇 Solo se muestra la imagen si existe poster_path */}
      {pelicula.poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w300${pelicula.poster_path}`}
          alt={`Póster de ${pelicula.title || pelicula.name}`}
          style={{ width: "100px", borderRadius: "4px" }}
        />
      )}

      <div>
        <h3>{pelicula.title || pelicula.name}</h3>
        <p>
          Año:{" "}
          {pelicula.release_date || pelicula.first_air_date
            ? (pelicula.release_date || pelicula.first_air_date).split("-")[0]
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
