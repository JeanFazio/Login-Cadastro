import { Link } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import "../SASS/headerStyle.scss";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="site-header">
      <div className="logo">
        <img src="/StutuTurbo Branco.png" alt="StutuTurbo" />
      </div>

      <button className="menu-toggle" onClick={toggleMenu}>
        {menuOpen ? <FiX size={26} color="#fff" /> : <FiMenu size={26} color="#fff" />}
      </button>

      <nav className={menuOpen ? "open" : ""}>
        <ul>
          <li>
            <Link to="/home" onClick={() => setMenuOpen(false)}>Home</Link>
          </li>
          <li>
            <Link to="/perfil" onClick={() => setMenuOpen(false)}>Perfil</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
