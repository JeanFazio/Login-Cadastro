import { useState } from 'react';
import axios from 'axios';
import './SASS/App.scss';


function App() {
  const [tab, setTab] = useState("login");
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3001/login", { email, senha });
      const { token } = response.data;

      localStorage.setItem("token", token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      alert("Login realizado com sucesso!");
    } catch (error) {
      if (error.response) {
        alert(`Erro: ${error.response.data}`);
      } else {
        alert("Erro ao conectar ao servidor.");
      }
      console.error(error);
    }
  };

  const handleCadastro = async () => {
    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    if (senha.length < 6) {
      alert("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/cadastro", {
        nome,
        email,
        senha,
      });
      alert(response.data); // Mensagem do servidor
    } catch (error) {
      if (error.response) {
        // Erro retornado pelo servidor
        alert(`Erro: ${error.response.data}`);
      } else {
        // Erro de rede ou outro
        alert("Erro ao conectar ao servidor.");
      }
      console.error(error);
    }
  };

  const consultarPerfil = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Você precisa estar logado para consultar o perfil.");
        return;
      }

      const response = await axios.get("http://localhost:3001/perfil", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Perfil:", response.data);
      alert(`Bem-vindo, ${response.data.usuario.nome}!`);
    } catch (error) {
      alert("Erro ao buscar perfil. Veja o console.");
      console.error("Erro ao buscar perfil", error);
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
          <button className={tab === 'login' ? 'active' : ''} onClick={() => { setTab('login'); limparCampos() }}>Login</button>
          <button className={tab === 'cadastro' ? 'active' : ''} onClick={() => { setTab('cadastro'); limparCampos() }}>Cadastro</button>
        </div>

        <div className="form">
          {tab === 'cadastro' && (
            <>
              <label htmlFor="nome" style={{ color: 'black' }}>Usuário</label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </>
          )}

          <label htmlFor="email" style={{ color: 'black' }}>E-mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="senha" style={{ color: 'black' }}>Senha</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          {tab === 'cadastro' && (
            <>
              <label htmlFor="confirmarSenha" style={{ color: 'black' }}>Confirmar Senha</label>
              <input
                type="password"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
              />
            </>
          )}

          <button onClick={tab === 'login' ? handleLogin : handleCadastro}>
            {tab === 'login' ? 'Entrar' : 'Cadastrar'}
          </button>
        </div>
        <button onClick={consultarPerfil}>Consultar Perfil</button>
      </div>
    </div>
  );
}

export default App;