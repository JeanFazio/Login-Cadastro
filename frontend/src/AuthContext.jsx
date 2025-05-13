import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => { 
    const token = localStorage.getItem("token");

    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      axios.get("http://localhost:3001/perfil")
        .then(res => {
          setUsuario(res.data.usuario);
        })
        .catch(err => {
          console.error("Erro ao validar token:", err);
          localStorage.removeItem("token");
          setUsuario(null);
        });
    }
  }, []);

  const login = async (token) => {
    localStorage.setItem("token", token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    try {
      const res = await axios.get("http://localhost:3001/perfil");
      setUsuario(res.data.usuario);
    } catch (error) {
      console.error("Erro ao buscar perfil:", error);
      logout(); // limpa o token inválido
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout, setUsuario }}>
      {children}
    </AuthContext.Provider>
  );
};
