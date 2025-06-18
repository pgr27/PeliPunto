export default function BotonFavoritos({ setVista }) {
  return (
    <button
      className="buttonApp buttonFavoritos"
      onClick={() => setVista("favoritos")}
    >
      ⭐ Mis Favoritos
    </button>
  );
}
