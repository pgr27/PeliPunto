import { createContext, useContext, useState, useEffect } from "react";

// CONTEXTO
const FavContexto = createContext();

// PROVIDER
export function FavProvider({ children }) {
  // estado inicial desde localStorage
  const [favoritos, setFavoritos] = useState(() => {
    const guardado = localStorage.getItem("favoritos");
    return guardado ? JSON.parse(guardado) : [];
  });

  // sincronizar cambios con localStorage
  useEffect(() => {
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  }, [favoritos]);

  // alternar favorito
  const alternarFavorito = (pelicula) => {
    setFavoritos((actual) =>
      actual.some((p) => p.id === pelicula.id)
        ? actual.filter((p) => p.id !== pelicula.id)
        : [...actual, pelicula]
    );
  };

  return (
    <FavContexto.Provider value={{ favoritos, alternarFavorito }}>
      {children}
    </FavContexto.Provider>
  );
}

// Hook para usar en componentes
export function useFav() {
  return useContext(FavContexto);
}
