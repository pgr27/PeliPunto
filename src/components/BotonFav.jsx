export default function BotonFavoritos({ setVista }) {
  return (
    <button className="botones-genericos" onClick={() => setVista("favoritos")}>
      ⭐ Mis Favoritos
    </button>
  );
}
