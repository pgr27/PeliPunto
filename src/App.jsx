import { useState, useEffect } from "react";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Link,
} from "react-router-dom";
import PeliBuscador from "./components/PeliBuscador";
import SelectorGenero from "./components/SelectorGenero";
import SelectorOrden from "./components/SelectorOrden";
import FichaPelicula from "./components/FichaPelicula";
import BannerLateral from "./components/BannerPeliculasSemana";
import BotonFav from "./components/BotonFav";
import Fav from "./pages/FavPage";
import Maratones from "./pages/MaratonesPage";
import MaratonGenero from "./components/MaratonGenero";
import PeliculasSemanaMovil from "./components/PeliculasSemanaMovil";
import PeliculasSemanaPage from "./pages/PeliculasSemanaPage";
import "./App.css";

function obtenerPeliculasAleatorias(peliculas, cantidad) {
  if (!peliculas || peliculas.length === 0) return [];
  return peliculas.sort(() => Math.random() - 0.5).slice(0, cantidad);
}

export default function App() {
  const [textoBusqueda, cambiarTextoBusqueda] = useState("");
  const [textoGenero, cambiarTextoGenero] = useState("");
  const [textoOrden, cambiarTextoOrden] = useState("");
  const [listaPeliculas, establecerListaPeliculas] = useState([]);
  const [peliculasParaBanner, setPeliculasParaBanner] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    async function cargarPopulares() {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${
          import.meta.env.VITE_TMDB_API_KEY
        }&language=es-ES&page=1`
      );
      const data = await res.json();
      setPeliculasParaBanner(data.results);
    }
    cargarPopulares();
  }, []);

  useEffect(() => {
    async function cargarBusqueda() {
      if (!textoBusqueda) {
        establecerListaPeliculas([]);
        return;
      }
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${
          import.meta.env.VITE_TMDB_API_KEY
        }&query=${textoBusqueda}&language=es-ES`
      );
      const data = await res.json();
      let filtradas = data.results;
      if (textoGenero) {
        filtradas = filtradas.filter((p) =>
          p.genre_ids.includes(Number(textoGenero))
        );
      }
      if (textoOrden === "popular")
        filtradas.sort((a, b) => b.popularity - a.popularity);
      if (textoOrden === "fecha")
        filtradas.sort(
          (a, b) => new Date(b.release_date) - new Date(a.release_date)
        );
      if (textoOrden === "titulo")
        filtradas.sort((a, b) => a.title.localeCompare(b.title));
      establecerListaPeliculas(filtradas);
    }
    cargarBusqueda();
  }, [textoBusqueda, textoGenero, textoOrden]);

  const pelisAleatorias =
    peliculasParaBanner.length > 0
      ? obtenerPeliculasAleatorias(peliculasParaBanner, 10)
      : [];

  return (
    <>
      <div>
        <div onClick={() => navigate("/maratones")} className="bloque-lateral">
          <span className="texto-banners">✨ Mejores Maratones</span>
          <img
            src="/PeliPuntoIcon.png"
            alt="Logo PeliPunto"
            className="estiloImagenBanner"
          />
          <span className="texto-banners">🖱️ Aquí</span>
        </div>
      </div>

      <header className="top-bar">
        <Link to="/" className="titulo-peli-punto">
          <h1>🎬 PeliPunto</h1>
        </Link>
        <div className="contenedor-botones-top">
          {location.pathname === "/" && (
            <Link to="/favoritos" className="botones-genericos solo-escritorio">
              ⭐ Favoritos
            </Link>
          )}

          {location.pathname !== "/" && (
            <Link to="/" className="botones-genericos solo-escritorio">
              🡰 Página Principal
            </Link>
          )}
        </div>
        <div className="dropdown">
          {/* Menú desplegable para movil */}
          <div className="dropdown">
            <button
              className="btn btn-light dropdown-toggle botones-genericos"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Menú
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li className="solo-movil">
                <Link className="dropdown-item" to="/favoritos">
                  ⭐ Mis favoritos
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/peliculas-semana">
                  🎬 Películas de la Semana
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/maratones">
                  🎞️ Maratones
                </Link>
              </li>
              {location.pathname !== "/" && (
                <li className="solo-movil">
                  <Link className="dropdown-item" to="/">
                    🡰 Página Principal
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </header>

      <div className="app-contenedor">
        <BannerLateral peliculas={pelisAleatorias} lado="izquierdo" />
        <main className="app-contenedor app-contenedor2">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <PeliBuscador
                    textoBusqueda={textoBusqueda}
                    cambiarTextoBusqueda={cambiarTextoBusqueda}
                  />
                  <SelectorGenero
                    textoGenero={textoGenero}
                    cambiarTextoGenero={cambiarTextoGenero}
                  />
                  <SelectorOrden
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
            <Route path="/maratones" element={<Maratones />} />
            <Route path="/peliculas-semana" element={<PeliculasSemanaPage />} />
          </Routes>
        </main>
      </div>
    </>
  );
}
