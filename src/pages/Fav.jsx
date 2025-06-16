import { useFav } from "../context/FavProvider";
import FichaPelicula from "../components/FichaPelicula";

export default function Fav({ setVista }) {
  const { favoritos } = useFav();

  if (favoritos.length === 0) {
    return (
      <div className="favoritos-contenedor">
        <p className="mensaje-favoritos">No tienes películas en favoritos.</p>
        <button className="volver-buscar" onClick={() => setVista("buscar")}>
          🔍 Volver a Buscar
        </button>
      </div>
    );
  }

  return (
    <section>
      <h1 className="titulo-peli-punto">- Mis Favoritos -</h1>
      <div className="lista-peliculas">
        {favoritos.map((pelicula) => (
          <FichaPelicula key={pelicula.id} pelicula={pelicula} />
        ))}
      </div>
      <button
        className="volver-buscar"
        onClick={() => {
          console.log("Cambiando vista a buscar...");
          setVista("buscar");
        }}
      >
        🔍 Volver a Buscar
      </button>
    </section>
  );
}
