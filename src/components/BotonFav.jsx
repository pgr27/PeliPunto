export default function BotonFavoritos({ setVista }) {
  return (
    <button className="buttonFavoritos" onClick={() => setVista("favoritos")}>
      ⭐ Mis Favoritos
    </button>
  );
}
