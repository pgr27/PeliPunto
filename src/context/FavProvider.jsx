import { createContext, useContext, useState, useEffect } from "react";
import customLog from "../utils/Logger";

const FavContexto = createContext();

// Provider
export function FavProvider({ children }) {
  const [favoritosPeliculas, setFavoritosPeliculas] = useState(() => {
    const guardado = localStorage.getItem("favoritosPeliculas");
    return guardado ? JSON.parse(guardado) : [];
  });
  const [favoritosSeries, setFavoritosSeries] = useState(() => {
    const guardado = localStorage.getItem("favoritosSeries");
    return guardado ? JSON.parse(guardado) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "favoritosPeliculas",
      JSON.stringify(favoritosPeliculas)
    );
  }, [favoritosPeliculas]);

  useEffect(() => {
    localStorage.setItem("favoritosSeries", JSON.stringify(favoritosSeries));
  }, [favoritosSeries]);

  const alternarFavoritoPeliculas = (pelicula) => {
    customLog("Alternando favorito para película:", pelicula);
    customLog("Todas las películas favoritas:", favoritosPeliculas);
    setFavoritosPeliculas((actual) =>
      actual.some((p) => p.id === pelicula.id)
        ? actual.filter((p) => p.id !== pelicula.id)
        : [...actual, pelicula]
    );
  };

  const alternarFavoritosSeries = (serie) => {
    setFavoritosSeries((actual) =>
      actual.some((s) => s.id === serie.id)
        ? actual.filter((s) => s.id !== serie.id)
        : [...actual, serie]
    );
  };
  return (
    <FavContexto.Provider
      value={{
        favoritosPeliculas,
        favoritosSeries,
        alternarFavoritoPeliculas,
        alternarFavoritosSeries,
      }}
    >
      {children}
    </FavContexto.Provider>
  );
}
export function useFav() {
  return useContext(FavContexto);
}
