export default function BotonVolver({ setVista }) {
  return (
    <button
      className="buttonApp volver-buscar"
      onClick={() => setVista("buscar")}
    >
      🔍 Volver a buscar
    </button>
  );
}
