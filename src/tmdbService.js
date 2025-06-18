const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function obtenerPeliculasSemana() {
  try {
    const response = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error obteniendo películas de la semana:", error);
    return [];
  }
}

export async function obtenerTrailer(movieId) {
  try {
    console.log("Buscando trailer para ID:", movieId);  // ✅ Verifica si movieId es correcto
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`);
    const data = await response.json();
    console.log("Respuesta de la API:", data);  // ✅ Muestra los datos que devuelve la API
    const trailer = data.results.find(
      (video) => video.site === "YouTube" && video.type === "Trailer"
    );
    console.log("Trailer encontrado:", trailer);  // ✅ Verifica si encuentra un trailer
    return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
  } catch (error) {
    console.error("Error obteniendo el trailer:", error);
    return null;
  }
}
