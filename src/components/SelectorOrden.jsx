function SelectorOrden({ textoOrden, cambiarTextoOrden }) {
  return (
    <select
      value={textoOrden}
      onChange={(e) => cambiarTextoOrden(e.target.value)}
      className="selector-buscadores"
    >
      <option value="">Ordenar por...</option>
      <option value="popular">Más populares</option>
      <option value="fecha">Fecha de estreno</option>
      <option value="titulo">Título A-Z</option>
    </select>
  );
}

export default SelectorOrden;
