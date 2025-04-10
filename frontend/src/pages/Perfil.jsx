// src/pages/Perfil.jsx
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Perfil() {
  const { usuario, logout } = useContext(AuthContext);
  const [perfil, setPerfil] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const response = await axios.get("http://localhost:3001/perfil", {
          headers: {
            Authorization: `Bearer ${usuario?.token}`,
          },
        });
        setPerfil(response.data.usuario);
      } catch (error) {
        alert("Erro ao buscar perfil");
        console.error(error);
      }
    };

    fetchPerfil();
  }, [usuario]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Perfil do Usuário</h1>
      {perfil ? (
        <>
          <p><strong>Nome:</strong> {perfil.nome}</p>
          <p><strong>Email:</strong> {perfil.email}</p>
        </>
      ) : (
        <p>Carregando dados do perfil...</p>
      )}
      <button onClick={handleLogout}>Sair</button>
    </div>
  );
}

export default Perfil;
