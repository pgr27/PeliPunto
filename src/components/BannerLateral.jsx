import React, { useState, useEffect } from "react";
import { obtenerTrailer } from "../tmdbService";

function BannerLateral({ peliculas = [], lado }) {
  const [indiceActual, setIndiceActual] = useState(0);
  const [trailerUrl, setTrailerUrl] = useState(null);

  useEffect(() => {
    console.log("Películas en BannerLateral:", peliculas);
    if (!peliculas || peliculas.length === 0) return;
    const intervalo = setInterval(() => {
      setIndiceActual((prev) => (prev + 1) % peliculas.length);
    }, 3000);
    return () => clearInterval(intervalo);
  }, [peliculas]);
  useEffect(() => {
    async function cargarTrailer() {
      if (!peliculas || peliculas.length === 0 || !peliculas[indiceActual])
        return; // ✅ Verifica que la película existe

      console.log("Obteniendo tráiler de:", peliculas[indiceActual].title);

      let url = null; // ✅ Inicializa la variable antes de usarla

      try {
        url = await obtenerTrailer(peliculas[indiceActual].id);
        console.log("Tráiler obtenido y guardado:", url);
        setTrailerUrl(url);
      } catch (error) {
        console.error("Error obteniendo el tráiler:", error);
        setTrailerUrl(null);
      }
    }
    cargarTrailer();
  }, [indiceActual, peliculas]);
  if (!peliculas || peliculas.length === 0) {
    return (
      <div style={{ color: "white", textAlign: "center" }}>
        Cargando películas...
      </div>
    );
  }
  const manejarClic = () => {
    console.log("Intentando abrir tráiler:", trailerUrl);
    if (trailerUrl) {
      window.open(trailerUrl, "_blank");
    } else {
      console.log("Tráiler no disponible 😢");
    }
  };
  return (
    <div className={`bannerLateral ${lado}`} onClick={manejarClic}>
      <div className={"estiloTituloBanner"}>🎥 Películas de la Semana</div>
      <img
        src={`https://image.tmdb.org/t/p/w500${peliculas[indiceActual].poster_path}`}
        alt={peliculas[indiceActual].title}
        className="estiloImagenBanner"
      />
    </div>
  );
}

export default BannerLateral;
