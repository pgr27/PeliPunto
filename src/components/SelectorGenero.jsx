function SelectorGenero({ textoGenero, cambiarTextoGenero }) {
  return (
    <select
      value={textoGenero}
      onChange={(e) => cambiarTextoGenero(e.target.value)}
      className="selector-buscadores"
    >
      <option value="">Todos los géneros</option>
      <option value="28">Acción</option>
      <option value="35">Comedia</option>
      <option value="18">Drama</option>
      <option value="27">Terror</option>
      <option value="10749">Romance</option>
      {/* Añade más géneros según necesites */}
    </select>
  );
}

export default SelectorGenero;
