// src/pages/AuthPage.jsx
import { useState, useContext } from 'react';
import axios from 'axios';
import '../SASS/App.scss';
import { AuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

function AuthPage() {
  const [tab, setTab] = useState("login");
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const { setUsuario } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3001/login", { email, senha });
      const { token, usuario } = response.data;

      localStorage.setItem("token", token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setUsuario(usuario); // define no contexto
      alert("Login realizado com sucesso!");
      navigate("/perfil");
    } catch (error) {
      alert(error.response ? error.response.data : "Erro ao conectar ao servidor.");
      console.error(error);
    }
  };

  const handleCadastro = async () => {
    if (senha !== confirmarSenha) return alert("As senhas não coincidem.", setConfirmarSenha(''));
    if (senha.length < 6) return alert("A senha deve ter pelo menos 6 caracteres.");

    try {
      const response = await axios.post("http://localhost:3001/cadastro", {
        nome,
        email,
        senha,
      });
      alert(response.data); // Mensagem do servidor
    } catch (error) {
      alert(error.response ? error.response.data : "Erro ao conectar ao servidor.");
      console.error(error);
    }
  };

  const limparCampos = () => {
    setNome('');
    setEmail('');
    setSenha('');
    setConfirmarSenha('');
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="tabs">
          <button className={tab === 'login' ? 'active' : ''} onClick={() => { setTab('login'); limparCampos(); }}>Login</button>
          <button className={tab === 'cadastro' ? 'active' : ''} onClick={() => { setTab('cadastro'); limparCampos(); }}>Cadastro</button>
        </div>

        <div className="form">
          {tab === 'cadastro' && (
            <>
              <label htmlFor="nome" style={{ color: 'black' }}>Usuário</label>
              <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
            </>
          )}

          <label htmlFor="email" style={{ color: 'black' }}>E-mail</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

          <label htmlFor="senha" style={{ color: 'black' }}>Senha</label>
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />

          {tab === 'cadastro' && (
            <>
              <label htmlFor="confirmarSenha" style={{ color: 'black' }}>Confirmar Senha</label>
              <input type="password" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} />
            </>
          )}

          <button onClick={tab === 'login' ? handleLogin : handleCadastro}>
            {tab === 'login' ? 'Entrar' : 'Cadastrar'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;