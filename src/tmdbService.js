const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const genreMap = {
  accion: 28,
  comedia: 35,
  terror: 27,
  drama: 18,
  romance: 10749,
  fantasia: 14,
  documental: 99,
};

export async function obtenerPeliculasSemana() {
  try {
    const response = await fetch(
      `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error obteniendo películas de la semana:", error);
    return [];
  }
}

export async function obtenerTrailer(movieId) {
  try {
    console.log("Buscando trailer para ID:", movieId);
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`
    );
    const data = await response.json();
    console.log("Respuesta de la API:", data);
    const trailer = data.results.find(
      (video) => video.site === "YouTube" && video.type === "Trailer"
    );
    console.log("Trailer encontrado:", trailer);
    return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
  } catch (error) {
    console.error("Error obteniendo el trailer:", error);
    return null;
  }
}

export async function obtenerPeliculasPorGenero(nombreGenero) {
  try {
    const idGenero = genreMap[nombreGenero.toLowerCase()];
    if (!idGenero) {
      console.warn("Género no reconocido:", nombreGenero);
      return [];
    }

    const response = await fetch(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${idGenero}&language=es-ES&sort_by=popularity.desc`
    );
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error obteniendo películas por género:", error);
    return [];
  }
}
