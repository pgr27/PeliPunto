function FiltrosPeliculas({
  textoBusqueda,
  cambiarTextoBusqueda,
  textoGenero,
  cambiarTextoGenero,
  textoOrden,
  cambiarTextoOrden,
}) {
  return (
    <form className="row g-3 mb-4 align-items-end">
      {/* Campo de búsqueda */}
      <div className="col-12 col-md-4">
        <label htmlFor="busqueda" className="form-label">
          Buscar películas
        </label>
        <input
          type="text"
          className="form-control"
          id="busqueda"
          value={textoBusqueda}
          onChange={(e) => cambiarTextoBusqueda(e.target.value)}
          placeholder="Ej. El Padrino"
        />
      </div>

      {/* Selector de género */}
      <div className="col-6 col-md-4">
        <label htmlFor="genero" className="form-label">
          Género
        </label>
        <select
          id="genero"
          className="form-select"
          value={textoGenero}
          onChange={(e) => cambiarTextoGenero(e.target.value)}
        >
          <option value="">Todos</option>
          <option value="28">Acción</option>
          <option value="35">Comedia</option>
          <option value="18">Drama</option>
          <option value="27">Terror</option>
          <option value="10749">Romance</option>
        </select>
      </div>

      {/* Selector de orden */}
      <div className="col-6 col-md-4">
        <label htmlFor="orden" className="form-label">
          Ordenar por
        </label>
        <select
          id="orden"
          className="form-select"
          value={textoOrden}
          onChange={(e) => cambiarTextoOrden(e.target.value)}
        >
          <option value="">-- Seleccionar --</option>
          <option value="popular">Más populares</option>
          <option value="fecha">Fecha de estreno</option>
          <option value="titulo">Título A-Z</option>
        </select>
      </div>
    </form>
  );
}

export default FiltrosPeliculas;
