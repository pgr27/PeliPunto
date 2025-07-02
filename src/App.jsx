import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import AppRutas from "./AppRutas";
import FichaPelicula from "./components/FichaPelicula";
import FiltrosPeliculas from "./components/FiltrosPeliculas";
import { obtenerSeriesSemana } from "./tmdbService";
import BotonFav from "./components/BotonFav";
import FavPage from "./pages/FavPage";
import PeliculasPage from "./pages/PeliculasPage";
import SeriesPage from "./pages/SeriesPage";
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
  const [seriesSemana, setSeriesSemana] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

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

  useEffect(() => {
    async function cargarSeriesSemana() {
      const datos = await obtenerSeriesSemana();
      setSeriesSemana(datos);
    }
    cargarSeriesSemana();
  }, []);
  return (
    <>
      <header className="top-bar">
        <Link to="/" className="titulo-peli-punto">
          <h1>🎬 PeliPunto</h1>
        </Link>
        <div className="contenedor-botones-top">
          {location.pathname === "/" && (
            <>
              <Link
                to="/peliculas"
                className="botones-genericos solo-escritorio"
              >
                🎬 Películas
              </Link>
              <button
                onClick={() => navigate("/series")}
                className="botones-genericos "
              >
                Series
              </button>
              <Link
                to="/favoritos"
                className="botones-genericos solo-escritorio"
              >
                ⭐ Favoritos
              </Link>
            </>
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
      <main className="app-contenedor app-contenedor2">
        <div className="app-contenedor2">
          <AppRutas
            textoBusqueda={textoBusqueda}
            cambiarTextoBusqueda={cambiarTextoBusqueda}
            textoGenero={textoGenero}
            cambiarTextoGenero={cambiarTextoGenero}
            textoOrden={textoOrden}
            cambiarTextoOrden={cambiarTextoOrden}
            listaPeliculas={listaPeliculas}
          />
        </div>
      </main>
    </>
  );
}
