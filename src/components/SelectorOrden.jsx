function SelectorOrden({ textoOrden, cambiarTextoOrden }) {
  return (
    <select
      value={textoOrden}
      onChange={(e) => cambiarTextoOrden(e.target.value)}
      style={{
        padding: "0.5rem",
        width: "100%",
        maxWidth: "400px",
        marginBottom: "1rem",
        fontSize: "16px",
      }}
    >
      <option value="">Ordenar por...</option>
      <option value="popular">Más populares</option>
      <option value="fecha">Fecha de estreno</option>
      <option value="titulo">Título A-Z</option>
    </select>
  );
}

export default SelectorOrden;
