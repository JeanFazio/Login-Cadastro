import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./AuthContext";
import { useContext } from "react";
import AuthPage from "./pages/AuthPage";
import Perfil from "./pages/Perfil";
import Home from "./pages/Home";

function PrivateRoute({ children }) {
  const { usuario } = useContext(AuthContext);
  return usuario ? children : <Navigate to="/" />;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route
            path="/perfil"
            element={
              <PrivateRoute>
                <Perfil />
              </PrivateRoute>
            }
          />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider >
  );
}

export default App;