export default function BotonVolver({ setVista }) {
  return (
    <button className="volver-buscar" onClick={() => setVista("buscar")}>
      🔍 Volver a buscar
    </button>
  );
}
