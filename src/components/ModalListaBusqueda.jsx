import FichaPelicula from "../components/FichaPelicula";
import Filtros from "../components/Filtros";

export default function ModalListaBusqueda({
  mostrar,
  cerrarModal,
  lista,
  tipo,
  textoBusqueda,
  cambiarTextoBusqueda,
  textoGenero,
  cambiarTextoGenero,
  textoOrden,
  cambiarTextoOrden,
}) {
  if (!mostrar) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-contenido">
        <div className="contenedor-botones-top">
          {(location.pathname === "/" || location.pathname === "/series") && (
            <Filtros
              tipo={location.pathname === "/series" ? "series" : "peliculas"}
              textoBusqueda={textoBusqueda}
              cambiarTextoBusqueda={cambiarTextoBusqueda}
              textoGenero={textoGenero}
              cambiarTextoGenero={cambiarTextoGenero}
              textoOrden={textoOrden}
              cambiarTextoOrden={cambiarTextoOrden}
            />
          )}
        </div>
        <button className="modal-cerrar" onClick={cerrarModal}>
          ✖
        </button>
        <h2>
          {tipo === "series" ? "Series encontradas" : "Películas encontradas"}
        </h2>
        <div className="modal-scroll">
          {lista.map((p) => (
            <FichaPelicula key={p.id} item={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
