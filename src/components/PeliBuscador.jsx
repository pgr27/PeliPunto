function PeliBuscador({ textoBusqueda, cambiarTextoBusqueda }) {
  return (
    <input
      type="text"
      value={textoBusqueda}
      onChange={(e) => cambiarTextoBusqueda(e.target.value)}
      placeholder="Buscar películas..."
      className="buscador-peliculas"
    />
  );
}

export default PeliBuscador;
