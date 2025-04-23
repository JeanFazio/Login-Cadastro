// src/pages/Perfil.jsx
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../SASS/Perfil.scss";

function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();
  const { setUsuario: setUsuarioContexto } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Você precisa estar logado!');
      navigate('/');
      return;
    }

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    axios.get('http://localhost:3001/perfil')
      .then(res => {
        setUsuario(res.data.usuario);
        setUsuarioContexto(res.data.usuario);
      })
      .catch(err => {
        console.error('Erro ao buscar perfil:', err);
        alert('Sessão expirada ou inválida.');
        localStorage.removeItem('token');
        navigate('/');
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUsuario(null);
    setUsuarioContexto(null);
    navigate('/');
  };

  return (
    <div className="perfil-page">
      <div className="perfil-card">
        {usuario ? (
          <>
            <h2>Olá, {usuario.nome}!</h2>
            <p><strong>Email:</strong> {usuario.email}</p>
            <button onClick={handleLogout}>Sair</button>
          </>
        ) : (
          <p>Carregando informações do perfil...</p>
        )}
      </div>
    </div>
  );
}

export default Perfil;