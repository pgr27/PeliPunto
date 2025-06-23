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
import BannerLateral from "./components/BannerLateral";
import BotonFav from "./components/BotonFav";
import Fav from "./pages/Fav";
import Maratones from "./pages/Maratones";
import MaratonGenero from "./components/MaratonGenero";
import "./App.css";

function obtenerPeliculasAleatorias(peliculas, cantidad) {
  if (!peliculas || peliculas.length === 0) return [];
  return peliculas.sort(() => Math.random() - 0.5).slice(0, cantidad);
}

export default function App() {
  const [textoBusqueda, cambiarTextoBusqueda] = useState("batman");
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
          <span className="texto-maratones">🎞️🧣 Mejores Maratones</span>

          <img
            src="/PeliPuntoIcon.png"
            alt="Logo PeliPunto"
            className="estiloImagenBanner"
          />
          <span className="texto-maratones">🖱️ Pulsa para</span>
        </div>
      </div>

      <header className="top-bar">
        <h1 className="titulo-peli-punto">🎬 PeliPunto</h1>
        <div className="contenedor-botones-top">
          {location.pathname === "/" && (
            <div className="solo-escritorio">
              <BotonFav />
            </div>
          )}{" "}
          {/* Menú desplegable añadido */}
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
                <Link className="dropdown-item" to="/">
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

      <div className="main-content">
        <BannerLateral peliculas={pelisAleatorias} lado="izquierdo" />
        <main className="app-contenedor">
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
          </Routes>
        </main>
      </div>
    </>
  );
}
