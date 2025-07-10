import React from "react";

function Filtros({
  tipo, // "peliculas" o "series"
  textoBusqueda,
  cambiarTextoBusqueda,
  textoGenero,
  cambiarTextoGenero,
  textoOrden,
  cambiarTextoOrden,
}) {
  return (
    <form>
      <div className="rowfiltros">
        <input
          type="text"
          className="botones-genericos"
          id="busqueda"
          value={textoBusqueda}
          onChange={(e) => cambiarTextoBusqueda(e.target.value)}
          placeholder={
            tipo === "peliculas" ? "Buscar película" : "Ej. Stranger Things"
          }
        />

        <select
          id="genero"
          className="botones-genericos"
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

        <select
          id="orden"
          className="botones-genericos"
          value={textoOrden}
          onChange={(e) => cambiarTextoOrden(e.target.value)}
        >
          <option value="">-- Ordenar por --</option>
          <option value="popular">Más populares</option>
          <option value="fecha">Fecha de estreno</option>
          <option value="titulo">Título A-Z</option>
        </select>
      </div>
    </form>
  );
}

export default Filtros;
