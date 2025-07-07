import { Routes, Route } from "react-router-dom";
import Filtros from "./components/Filtros";
import FichaPelicula from "./components/FichaPelicula";
import Fav from "./pages/FavPage";
import PeliculasPage from "./pages/PeliculasPage";
import SeriesPage from "./pages/SeriesPage";

function AppRutas({
  textoBusqueda,
  setTextoBusqueda,
  textoGenero,
  setTextoGenero,
  textoOrden,
  setTextoOrden,
  listaPeliculas,
}) {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Filtros
              textoBusqueda={textoBusqueda}
              cambiarTextoBusqueda={setTextoBusqueda}
              textoGenero={textoGenero}
              cambiarTextoGenero={setTextoGenero}
              textoOrden={textoOrden}
              cambiarTextoOrden={setTextoOrden}
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
