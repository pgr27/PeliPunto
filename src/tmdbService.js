const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const genreMap = {
  accion: 28,
  aventura: 12,
  animacion: 16,
  "ciencia ficción": 878,
  comedia: 35,
  crimen: 80,
  musical: 10402,
  romance: 10749,
  terror: 27,
};

const genreMapSeries = {
  accion: 10759,
  animacion: 16,
  "ciencia ficción": 10765,
  comedia: 35,
  crimen: 80,
  romance: 10749,
  terror: 9648
};

/*Obtener Pelicuals de la semana*/
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
        console.log("Películas obtenidas en ObtenerPeliculasPorGenero:", data.results);

    return data.results || [];
  } catch (error) {
    console.error("Error obteniendo películas por género:", error);
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
    console.log(data.results)
    console.log("Trailer encontrado:", trailer);
    return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
  } catch (error) {
    console.error("Error obteniendo el trailer:", error);
    return null;
  }
}
/*Obtener Series*/
export async function obtenerSeriesSemana() {
  try {
    const response = await fetch(
      `${BASE_URL}/trending/tv/week?api_key=${API_KEY}&language=es-ES`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error obteniendo series de la semana:", error);
    return [];
  }
}
export async function obtenerSeriesPorGenero(nombreGenero) {
  const idGenero = genreMapSeries[nombreGenero.toLowerCase()];
  try {
    if (!idGenero) {
      console.warn("Género no reconocido en series:", nombreGenero);
      return [];
    }
    const response = await fetch(
      `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=${idGenero}&language=es-ES&sort_by=popularity.desc`
    );
    const data = await response.json();
    console.log(`Series obtenidas para ${nombreGenero}:`, data.results);
    return data.results || [];
  } catch (error) {
    console.error("Error obteniendo series por género:", error);
    return [];
  }
}
export async function obtenerTrailerSerie(serieId) {
  try {
    const response = await fetch(
      `${BASE_URL}/tv/${serieId}/videos?api_key=${API_KEY}`
    );
    const data = await response.json();
    const trailer = data.results.find(
      (video) => video.site === "YouTube" && video.type === "Trailer"
    );
    return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
  } catch (error) {
    console.error("Error obteniendo el tráiler de la serie:", error);
    return null;
  }
}