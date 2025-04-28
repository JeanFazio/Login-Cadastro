import { Link } from "react-router-dom";
import "../SASS/headerStyle.scss";

function Header() {
  return (
    <header className="site-header">
      <div className="logo">
        <img src="/StutuTurbo Branco.png" alt="StutuTurbo" />
      </div>
      <nav>
        <Link to="/home">Home</Link>
        <Link to="/perfil">Perfil</Link>
      </nav>
    </header>
  );
}

export default Header;
