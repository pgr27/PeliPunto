import { useState, useEffect } from "react";
import PeliBuscador from "./components/PeliBuscador";
import SelectorGenero from "./components/SelectorGenero";
import SelectorOrden from "./components/SelectorOrden";
import FichaPelicula from "./components/FichaPelicula";
import BannerLateral from "./components/BannerLateral";
import BotonFav from "./components/BotonFav";
import BotonVolverBuscar from "./components/BotonVolverBuscar";
import Fav from "./pages/Fav";
import "./App.css";

function obtenerPeliculasAleatorias(peliculas, cantidad) {
  if (!peliculas || peliculas.length === 0) return [];
  return peliculas.sort(() => Math.random() - 0.5).slice(0, cantidad);
}

export default function App() {
  const [vista, setVista] = useState("buscar");
  const [textoBusqueda, cambiarTextoBusqueda] = useState("batman");
  const [textoGenero, cambiarTextoGenero] = useState("");
  const [textoOrden, cambiarTextoOrden] = useState("");
  const [listaPeliculas, establecerListaPeliculas] = useState([]);
  const [peliculasParaBanner, setPeliculasParaBanner] = useState([]);

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
      <img
        src="/public/PeliPuntoIcon.png"
        alt="Logo PeliPunto"
        className="logo"
      />
      <header className="top-bar">
        <h1 className="titulo-peli-punto">
          {vista === "buscar" ? "🎬 PeliPunto" : "⭐Mis favoritos"}
        </h1>

        <div className="botones-top-bar">
          {vista === "buscar" ? (
            <BotonFav setVista={setVista} />
          ) : (
            <BotonVolverBuscar setVista={setVista} />
          )}
        </div>
      </header>

      <div className="main-content">
        {vista === "buscar" && (
          <BannerLateral peliculas={pelisAleatorias} lado="izquierdo" />
        )}
        <main className="app-contenedor">
          {vista === "buscar" ? (
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
          ) : (
            <Fav setVista={setVista} />
          )}
        </main>
      </div>
    </>
  );
}
