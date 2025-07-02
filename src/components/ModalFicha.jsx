import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import FichaPelicula from "./FichaPelicula";
import "../App.css";

function ModalFicha({ abierto, onCerrar, contenido, trailerUrl }) {
  if (!contenido) return null;

  return (
    <Popup open={abierto} onClose={onCerrar} modal nested>
      <div className="modal-contenido">
        <button className="modal-cerrar" onClick={onCerrar}>
          ✖
        </button>

        <FichaPelicula pelicula={contenido} />
        {trailerUrl && (
          <div className="ficha-pelicula container text-center">
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
