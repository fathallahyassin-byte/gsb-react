import { useState } from 'react';
import { useAuth } from '../context/AuthContext'; 
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css' ;

export default function Login() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

 
  const { loginUser } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();

    const success = loginUser(login, password);
  try {
    await loginUser(login, password); 
    navigate('/dashboard');           
  } catch (error) {
    alert('Echec de la connexion');   
  };}

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Connexion</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <div>
            <label>Login :</label>
            <input
            name="login"
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Mot de passe :</label>
            <input
            name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Se Connecter</button>
        </form>
      </div>
    </div>
  );
}
