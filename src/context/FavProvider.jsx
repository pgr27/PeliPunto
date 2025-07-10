import { createContext, useContext, useState, useEffect } from "react";

// CONTEXTO
const FavContexto = createContext();

// PROVIDER
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

// Hook para usar en componentes
export function useFav() {
  return useContext(FavContexto);
}
