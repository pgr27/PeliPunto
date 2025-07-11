import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import FichaPelicula from "../components/FichaPelicula";
import "../App.css";

function ModalFicha({ abierto, onCerrar, contenido, trailerUrl, isPelicula }) {
  if (!contenido) return null;

  return (
    <Popup open={abierto} onClose={onCerrar} modal nested>
      <div className="modal-contenido">
        <button className="modal-cerrar" onClick={onCerrar}>
          ✖
        </button>

        <FichaPelicula item={contenido} isPelicula={isPelicula} />
        {trailerUrl && (
          <div className="ficha-pelicula ficha-peliculaEspecial container text-center">
            {" "}
            <iframe
              width="100%"
              height="500"
              src={trailerUrl.replace("watch?v=", "embed/")}
              title="Tráiler"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
    </Popup>
  );
}

export default ModalFicha;
