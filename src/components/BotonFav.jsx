import { Link } from "react-router-dom";

export default function BotonFavoritos() {
  return (
    <Link to="/favoritos" className="botones-genericos">
      ⭐ Mis Favoritos
    </Link>
  );
}
