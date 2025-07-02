// src/pages/Perfil.jsx
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext";
import Header from "../components/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../SASS/Perfil.scss";

function Perfil() {
  const [tab, setTab] = useState("meusPedidos");
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
    <div className="perfil-web">
      <div>
        <Header />
        {usuario ? (
          <div className="perfil-layout">
            <aside className="perfil-sidebar">
              <img
                src="./avatar-padrao.png"
                alt="Avatar do usuário"
                className="avatar-web"
              />
              <h2>{usuario.nome}</h2>
              <p>{usuario.email}</p>
              <button className="btn-sair" onClick={handleLogout}>Sair</button>
            </aside>

            <section className="perfil-conteudo">
              <h1>Minha Conta</h1>
              <div className="perfil-box">
                <h3>Informações Pessoais</h3>
                <p><strong>Nome:</strong> {usuario.nome}</p>
                <p><strong>Email:</strong> {usuario.email}</p>
              </div>

              <div className="perfil-box">
                <h3>Ações Rápidas</h3>
                <button className="btn-acao">Editar Perfil</button>
                <button className="btn-acao">Ver Histórico de Pedidos</button>
              </div>
            </section>
          </div>
        ) : (
          <p>Carregando perfil...</p>
        )}

        <div className="perfil-tabs-container">
          <div className="Perfiltabs">
            <button className={tab === "meusPedidos" ? "active" : ""} onClick={() => setTab("meusPedidos")}>
              Meus Pedidos
            </button>
            <button className={tab === "favoritos" ? "active" : ""} onClick={() => setTab("favoritos")}>
              Favoritos
            </button>
          </div>
          
          <div className="perfil-content">
            {tab === "meusPedidos" && (
              <div className="perfil-meus-pedidos">
                <h2>Meus Pedidos</h2>
                {/* listar os pedidos do usuário */}
                <p>Lista de pedidos...</p>
              </div>
            )}
            {tab === "favoritos" && (
              <div className="perfil-favoritos">
                <h2>Favoritos</h2>
                {/* listar os produtos favoritos do usuário */}
                <p>Lista de favoritos...</p>
              </div>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}

export default Perfil;