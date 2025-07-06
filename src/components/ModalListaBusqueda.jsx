import FichaPelicula from "../components/FichaPelicula";
export default function ModalListaBusqueda({
  mostrar,
  cerrarModal,
  lista,
  tipo,
}) {
  if (!mostrar) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-contenido">
        <button className="modal-cerrar" onClick={cerrarModal}>
          ✖
        </button>
        <h2>
          {tipo === "series" ? "Series encontradas" : "Películas encontradas"}
        </h2>
        <div className="modal-scroll">
          {lista.map((p) => (
            <FichaPelicula key={p.id} pelicula={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
