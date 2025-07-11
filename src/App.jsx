import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import AppRutas from "./AppRutas";
import { obtenerSeriesSemana } from "./tmdbService";
import Filtros from "./components/Filtros";
import PeliculasPage from "./pages/PeliculasPage";
import ModalListaBusqueda from "./components/ModalListaBusqueda";
import "./App.css";

export default function App() {
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [textoGenero, setTextoGenero] = useState("");
  const [textoOrden, setTextoOrden] = useState("");
  const [listaPeliculas, establecerListaPeliculas] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [seriesSemana, setSeriesSemana] = useState([]);
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
      <header>
        <Link to="/" className="titulo-peli-punto">
          <h1>🎬 PeliPunto</h1>
        </Link>

        <div className="botones-top">
          {(location.pathname === "/" || location.pathname === "/series") && (
            <Filtros
              tipo={location.pathname === "/series" ? "series" : "peliculas"}
              textoBusqueda={textoBusqueda}
              cambiarTextoBusqueda={setTextoBusqueda}
            />
          )}
          {["/", "/peliculas", "/series"].includes(location.pathname) && (
            <Link to="/favoritos" className="botones-genericos">
              ⭐ Favoritos
            </Link>
          )}

          {location.pathname === "/" && (
            <button
              onClick={() => navigate("/series")}
              className="botones-genericos "
            >
              Series
            </button>
          )}

          {location.pathname == "/series" && (
            <button onClick={() => navigate("/")} className="botones-genericos">
              Peliculas
            </button>
          )}
          {location.pathname == "/favoritos" && (
            <button onClick={() => navigate("/")} className="botones-genericos">
              Pagina Principal
            </button>
          )}
        </div>
      </header>
      <ModalListaBusqueda
        mostrar={mostrarModal}
        cerrarModal={() => setMostrarModal(false)}
        lista={listaPeliculas}
        tipo={location.pathname === "/series" ? "series" : "peliculas"}
        textoBusqueda={textoBusqueda}
        cambiarTextoBusqueda={setTextoBusqueda}
        textoGenero={textoGenero}
        cambiarTextoGenero={setTextoGenero}
        textoOrden={textoOrden}
        cambiarTextoOrden={setTextoOrden}
      />
      <main className="app-contenedor">
        <main>
          {location.pathname === "/" ? (
            <PeliculasPage
              textoBusqueda={textoBusqueda}
              cambiarTextoBusqueda={setTextoBusqueda}
              textoGenero={textoGenero}
              cambiarTextoGenero={setTextoGenero}
              textoOrden={textoOrden}
              cambiarTextoOrden={setTextoOrden}
              listaPeliculas={listaPeliculas}
            />
          ) : (
            <AppRutas
              textoBusqueda={textoBusqueda}
              cambiarTextoBusqueda={setTextoBusqueda}
              textoGenero={textoGenero}
              cambiarTextoGenero={setTextoBusqueda}
              textoOrden={textoOrden}
              cambiarTextoOrden={setTextoOrden}
              listaPeliculas={listaPeliculas}
            />
          )}
        </main>
      </main>
    </>
  );
}
