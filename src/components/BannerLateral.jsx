import React, { useState, useEffect } from "react";

function BannerLateral({ peliculas = [], lado }) {
  const [indiceActual, setIndiceActual] = useState(0);

  useEffect(() => {
    console.log("Películas en BannerLateral:", peliculas);
    if (!peliculas || peliculas.length === 0) return;
    const intervalo = setInterval(() => {
      setIndiceActual((prev) => (prev + 1) % peliculas.length);
    }, 3000);
    return () => clearInterval(intervalo);
  }, [peliculas]);

  if (!peliculas || peliculas.length === 0) {
    return (
      <div style={{ color: "white", textAlign: "center" }}>
        Cargando películas...
      </div>
    );
  }
  console.log("Películas recibidas en BannerLateral:", peliculas);
  return (
    <div className={`bannerLateral ${lado}`}>
      <div className={"estiloTituloBanner"}>🎥 Películas de la Semana</div>
      <img
        src={`https://image.tmdb.org/t/p/w500${peliculas[indiceActual].poster_path}`}
        alt={peliculas[indiceActual].title}
        className="estiloImagenBannerLateral"
      />
    </div>
  );
}

export default BannerLateral;
