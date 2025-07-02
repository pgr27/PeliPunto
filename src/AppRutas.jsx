import { Routes, Route } from "react-router-dom";
import FiltrosPeliculas from "./components/FiltrosPeliculas";
import FichaPelicula from "./components/FichaPelicula";
import Fav from "./pages/FavPage";
import PeliculasPage from "./pages/PeliculasPage";
import SeriesPage from "./pages/SeriesPage";

function AppRutas({
  textoBusqueda,
  cambiarTextoBusqueda,
  textoGenero,
  cambiarTextoGenero,
  textoOrden,
  cambiarTextoOrden,
  listaPeliculas,
}) {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <FiltrosPeliculas
              textoBusqueda={textoBusqueda}
              cambiarTextoBusqueda={cambiarTextoBusqueda}
              textoGenero={textoGenero}
              cambiarTextoGenero={cambiarTextoGenero}
              textoOrden={textoOrden}
              cambiarTextoOrden={cambiarTextoOrden}
            />
            <div className="lista-peliculas">
              {listaPeliculas.map((pelicula) => (
                <FichaPelicula key={pelicula.id} pelicula={pelicula} />
              ))}
            </div>
          </>
        }
      />
      <Route path="/favoritos" element={<Fav />} />
      <Route path="/peliculas" element={<PeliculasPage />} />
      <Route path="/series" element={<SeriesPage />} />
    </Routes>
  );
}

export default AppRutas;
