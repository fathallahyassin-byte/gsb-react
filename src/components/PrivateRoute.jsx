import { useAuth } from "../context/AuthContext";
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const { token, loading } = useAuth();

  if (loading) {
    return <div>Chargement...</div>;  // attente du contexte chargé
  }

  if (!token) {
    return <Navigate to="/login" replace />;  // pas de token => redirection login
  }

  return children;  // token présent => accès autorisé
}

export default PrivateRoute;
