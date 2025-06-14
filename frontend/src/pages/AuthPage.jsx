// src/pages/AuthPage.jsx
import { useState, useContext } from "react";
import axios from "axios";
import "../SASS/AuthPage.scss";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function AuthPage() {
  const [tab, setTab] = useState("login");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });
  const [success, setSuccess] = useState({
    email: "",
  });

  const verificarEmail = async (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Verifica formato antes de consultar o backend
    if (!emailRegex.test(email)) {
      setErrors((prev) => ({
        ...prev,
        email: "Insira um e-mail válido (ex: exemplo@email.com)",
      }));
      setSuccess((prev) => ({ ...prev, email: "" }));
      return;
    }

    try {
      const { data } = await axios.get(
        "http://localhost:3001/verificar-email",
        { params: { email } }
      );

      setErrors((prev) => ({
        ...prev,
        email: data.disponivel ? "" : data.mensagem,
      }));
      setSuccess((prev) => ({
        ...prev,
        email: data.disponivel ? data.mensagem : "",
      }));
    } catch (error) {
      console.error("Erro ao verificar email:", error);
      setErrors((prev) => ({ ...prev, email: "Erro ao verificar email" }));
      setSuccess((prev) => ({ ...prev, email: "" }));
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3001/login", {
        email,
        senha,
      });
      const { token } = response.data;

      await login(token);
      console.log("Login bem-sucedido:", response.data);
      navigate("/home");
    } catch (error) {
      alert(
        error.response ? error.response.data : "Erro ao conectar ao servidor."
      );
      console.error(error);
    }
  };

  const handleCadastro = async () => {
    const novosErros = {
      username: "",
      email: "",
      senha: "",
      confirmarSenha: "",
    };

    // Validação de e-mail

    // Validação de senha
    if (senha.length < 6) {
      novosErros.senha = "A senha deve ter pelo menos 6 caracteres.";
    }

    // Confirmação de senha
    if (senha !== confirmarSenha) {
      novosErros.confirmarSenha = "As senhas não coincidem";
    }

    // Se houver erros, exibe e interrompe
    const temErros = Object.values(novosErros).some((erro) => erro !== "");
    if (temErros) {
      setErrors(novosErros);
      return;
    }

    try {
      await axios.post("http://localhost:3001/cadastro", {
        nome,
        email,
        senha,
      });

      alert("Cadastro realizado com sucesso!");
      setErrors({});
      limparCampos();
    } catch (error) {
      setErrors({ email: error.response?.data || "Erro ao cadastrar." });
    }
  };

  const limparCampos = () => {
    setNome("");
    setEmail("");
    setSenha("");
    setConfirmarSenha("");
    setErrors("");
    setSuccess("");
  };

  return (
    <div className="login-page">
      <div className="authPage-header">
        <div className="text-container">
          <h1>
            <span>Be</span>m-vindo
          </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <button class="cssbuttons-io">
            <span>
              Saiba Mais
            </span>
          </button>
        </div>
        <div className="login-card">
          <img className="logo-img" src="./StutuTurbo Branco.png" alt="" />
          <div className="tabs">
            <button
              className={tab === "login" ? "active" : ""}
              onClick={() => {
                setTab("login");
                limparCampos();
              }}
            >
              Login
            </button>
            <button
              className={tab === "cadastro" ? "active" : ""}
              onClick={() => {
                setTab("cadastro");
                limparCampos();
              }}
            >
              Cadastro
            </button>
          </div>

          <div className="form">
            <div className="form-group">
              {tab === "cadastro" && (
                <>
                  <label>Usuário</label>
                  <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />
                  {errors.username && (
                    <span className="error">{errors.username}</span>
                  )}
                </>
              )}
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  const novoEmail = e.target.value;
                  setEmail(novoEmail);
                  if (tab === "cadastro") {
                    verificarEmail(novoEmail);
                  }
                }}
              />
              {errors.email && <span className="error">{errors.email}</span>}
              {success.email && (
                <span className="sucesso">{success.email}</span>
              )}
            </div>

            <div className="form-group">
              <label>Senha</label>
              <div className="password-wrapper">
                <input
                  type={mostrarSenha ? "text" : "password"}
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
                <span
                  className="toggle-password"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                >
                  {mostrarSenha ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>

              {errors.senha && <span className="error">{errors.senha}</span>}
            </div>

            <div className="form-group">
              {tab === "cadastro" && (
                <>
                  <label>Confirmar Senha</label>
                  <div className="password-wrapper">
                    <input
                      type={mostrarConfirmarSenha ? "text" : "password"}
                      value={confirmarSenha}
                      onChange={(e) => setConfirmarSenha(e.target.value)}
                    />
                    <span
                      className="toggle-password"
                      onClick={() =>
                        setMostrarConfirmarSenha(!mostrarConfirmarSenha)
                      }
                    >
                      {mostrarConfirmarSenha ? <FaEye /> : <FaEyeSlash />}
                    </span>
                  </div>
                  {errors.confirmarSenha && (
                    <span className="error">{errors.confirmarSenha}</span>
                  )}
                </>
              )}
            </div>

            <button onClick={tab === "login" ? handleLogin : handleCadastro}>
              {tab === "login" ? "Entrar" : "Cadastrar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
