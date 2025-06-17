// src/pages/AuthPage.jsx
import { useState, useContext } from "react";
import axios from "axios";
import "../SASS/AuthPage.scss";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRef } from "react";

function AuthPage() {
  const [tab, setTab] = useState("login");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);
  const nomeRef = useRef(null);
  const emailRef = useRef(null);
  const senhaRef = useRef(null);
  const confirmarSenhaRef = useRef(null);
  const botaoPrincipalRef = useRef(null);

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

  const handleKeyDown = (e, nextRef) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Evita que o formulário dê submit antes da hora
      if (nextRef && nextRef.current) {
        nextRef.current.focus();
      }
    }
  };

  const verificarEmail = async (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setSuccess((prev) => ({ ...prev, email: "" }));
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
    setErrors({
      username: "",
      email: "",
      senha: "",
      confirmarSenha: "",
    });
    setSuccess({
      email: "",
    });

    try {
      await axios.post("http://localhost:3001/cadastro", {
        nome,
        email,
        senha,
        confirmarSenha
      });

      alert("Cadastro realizado com sucesso!");
      setErrors({});
      limparCampos();
    } catch (error) {
      const backendErrors = error.response?.data?.errors || "Erro ao Cadastrar";

      if (backendErrors) {
        setSuccess
        setErrors((prev) => ({
          ...prev,
          ...backendErrors,
        }));
      } else {
        alert("Erro desconhecido ao cadastrar.");
      }
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
          <button className="cssbuttons-io">
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
                    onKeyDown={(e) => handleKeyDown(e, emailRef)}
                    ref={nomeRef}
                  />
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
                onKeyDown={(e) => handleKeyDown(e, senhaRef)}
                ref={emailRef}
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
                  onKeyDown={(e) => {
                    if (tab === "cadastro") {
                      handleKeyDown(e, confirmarSenhaRef);
                    } else {
                      handleKeyDown(e, botaoPrincipalRef);
                    }
                  }}
                  ref={senhaRef}
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
                      onKeyDown={(e) => handleKeyDown(e, botaoPrincipalRef)}
                      ref={confirmarSenhaRef}
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

            <button onClick={tab === "login" ? handleLogin : handleCadastro} ref={botaoPrincipalRef}>
              {tab === "login" ? "Entrar" : "Cadastrar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
