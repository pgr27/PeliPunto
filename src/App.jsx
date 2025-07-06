import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import AppRutas from "./AppRutas";
import { obtenerSeriesSemana } from "./tmdbService";
import PeliculasPage from "./pages/PeliculasPage";
import ModalListaBusqueda from "./components/ModalListaBusqueda";
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
  const [mostrarModal, setMostrarModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    async function cargarBusqueda() {
      if (!textoBusqueda.trim()) {
        establecerListaPeliculas([]);
        return;
      }

      const tipo = location.pathname === "/series" ? "tv" : "movie";
      const res = await fetch(
        `https://api.themoviedb.org/3/search/${tipo}?api_key=${
          import.meta.env.VITE_TMDB_API_KEY
        }&query=${textoBusqueda}&language=es-ES`
      );
      const data = await res.json();
      let filtradas = data.results;

      // Género y orden igual que antes
      if (textoGenero)
        filtradas = filtradas.filter((p) =>
          p.genre_ids.includes(Number(textoGenero))
        );
      if (textoOrden === "popular")
        filtradas.sort((a, b) => b.popularity - a.popularity);
      if (textoOrden === "fecha")
        filtradas.sort(
          (a, b) =>
            new Date(b.release_date || b.first_air_date) -
            new Date(a.release_date || a.first_air_date)
        );
      if (textoOrden === "titulo")
        filtradas.sort((a, b) =>
          (a.title || a.name).localeCompare(b.title || b.name)
        );

      establecerListaPeliculas(filtradas);
    }

    cargarBusqueda();
  }, [textoBusqueda, textoGenero, textoOrden, location.pathname]);
  useEffect(() => {
    const esRutaValida =
      location.pathname === "/" || location.pathname === "/series";
    const hayTexto = textoBusqueda.trim().length > 0;
    const hayResultados = listaPeliculas.length > 0;

    setMostrarModal(esRutaValida && hayTexto && hayResultados);
  }, [textoBusqueda, listaPeliculas, location.pathname]);

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
        <div className="contenedor-botones-top2">
          {(location.pathname === "/" || location.pathname === "/series") && (
            <>
              <input
                id="buscador"
                type="text"
                className="botones-genericos"
                value={textoBusqueda}
                onChange={(e) => cambiarTextoBusqueda(e.target.value)}
                placeholder={
                  location.pathname === "/series"
                    ? "Buscar series..."
                    : "Buscar películas..."
                }
              />

              <select
                className="botones-genericos"
                value={textoGenero}
                onChange={(e) => cambiarTextoGenero(e.target.value)}
              >
                <option value="">Todos</option>
                <option value="28">Acción</option>
                <option value="35">Comedia</option>
                <option value="18">Drama</option>
                <option value="27">Terror</option>
                <option value="10749">Romance</option>
              </select>

              <select
                className="botones-genericos"
                value={textoOrden}
                onChange={(e) => cambiarTextoOrden(e.target.value)}
              >
                <option value="">Ordenar por</option>
                <option value="popular">Más populares</option>
                <option value="fecha">Fecha de estreno</option>
                <option value="titulo">Título A-Z</option>
              </select>
            </>
          )}
        </div>
        <div className="contenedor-botones-top">
          {location.pathname === "/" && (
            <>
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
            <button
              onClick={() => navigate("/")}
              className="botones-genericos "
            >
              Peliculas
            </button>
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
      <ModalListaBusqueda
        mostrar={mostrarModal}
        cerrarModal={() => setMostrarModal(false)}
        lista={listaPeliculas}
        tipo={location.pathname === "/series" ? "series" : "peliculas"}
      />
      <main className="app-contenedor app-contenedor2">
        <main className="app-contenedor app-contenedor2">
          {location.pathname === "/" ? (
            <PeliculasPage
              textoBusqueda={textoBusqueda}
              cambiarTextoBusqueda={cambiarTextoBusqueda}
              textoGenero={textoGenero}
              cambiarTextoGenero={cambiarTextoGenero}
              textoOrden={textoOrden}
              cambiarTextoOrden={cambiarTextoOrden}
              listaPeliculas={listaPeliculas}
            />
          ) : (
            <AppRutas
              textoBusqueda={textoBusqueda}
              cambiarTextoBusqueda={cambiarTextoBusqueda}
              textoGenero={textoGenero}
              cambiarTextoGenero={cambiarTextoGenero}
              textoOrden={textoOrden}
              cambiarTextoOrden={cambiarTextoOrden}
              listaPeliculas={listaPeliculas}
            />
          )}
        </main>
      </main>
    </>
  );
}
