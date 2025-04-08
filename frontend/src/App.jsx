import { useState } from 'react';
import './SASS/App.scss';

function App() {
  const [tab, setTab] = useState("login");
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const handleLogin = () => {
    fetch("http://localhost:3001/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    })
      .then(res => res.text())
      .then(msg => alert(msg))
      .catch(err => console.error(err));
  };

  const handleCadastro = () => {
    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    fetch("http://localhost:3001/cadastro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, senha }),
    })
      .then(res => res.text())
      .then(msg => alert(msg))
      .catch(err => console.error(err));
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="tabs">
          <button className={tab === 'login' ? 'active' : ''} onClick={() => setTab('login')}>Login</button>
          <button className={tab === 'cadastro' ? 'active' : ''}onClick={() => setTab('cadastro')}>Cadastro</button>
        </div>

        <div className="form">
          {tab === 'cadastro' && (
            <>
              <input
                type="text"
                placeholder="Nome de usuário"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </>
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          {tab === 'cadastro' && (
            <>
              <input
                type="password"
                placeholder="Confirmar senha"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
              />
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

export default App;