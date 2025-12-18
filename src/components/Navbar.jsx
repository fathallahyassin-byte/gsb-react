import '../styles/Navbar.css'
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logoutUser } = useAuth();

  return (
    <nav>
      <div>
        <div>
          <span>GSB frais</span>  
          <Link className="home" to="/">Accueil</Link>
{user && (
        <>
          <Link to="/dashboard">Tableau de bord</Link>
          <Link to="/frais/ajouter">Ajouter Frais</Link>
        </>
      )}
        </div>

        <div>
          {user ? (
            <button type="logout" onClick={logoutUser} style={{ color: 'white', background: 'none', border:'none' }}>
              Déconnexion
            </button>
          ) : (
            <Link to="/login">Connexion</Link>
          )}
        </div>
      </div>
    </nav>
  );
}


export default Navbar;
