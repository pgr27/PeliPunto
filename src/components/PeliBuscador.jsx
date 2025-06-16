function PeliBuscador({ textoBusqueda, cambiarTextoBusqueda }) {
  return (
    <input
      type="text"
      value={textoBusqueda}
      onChange={(e) => cambiarTextoBusqueda(e.target.value)}
      placeholder="Buscar películas..."
      style={{
        padding: '0.5rem',
        width: '100%',
        maxWidth: '400px',
        marginBottom: '1rem',
        fontSize: '16px',
      }}
    />
  );
}

export default PeliBuscador;
