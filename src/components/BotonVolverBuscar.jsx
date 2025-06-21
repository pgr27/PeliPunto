export default function BotonVolver({ setVista }) {
  return (
    <button className="botones-genericos" onClick={() => setVista("buscar")}>
      🔍 Volver a buscar
    </button>
  );
}
