import FraisTable from '../components/FraisTable';
import { useAuth } from '../context/AuthContext';

function Dashboard() {
  const { user } = useAuth();

  if (!user) {
    return <p>Bienvenue !</p>;
  }

  return (
    <div>
      <h1>Tableau de bord</h1>
      <p>Bienvenue, {user.login} !</p>
      <FraisTable />
    </div>
  );
}

export default Dashboard;
