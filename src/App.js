import './App.css';
import { BrowserRouter, Routes , Route, Link } from 'react-router-dom';
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import FraisAdd from './pages/FraisAdd';
import FraisEdit from './pages/FraisEdit';
import FraisHorsForfait from './pages/FraisHorsForfait'
import FraisHorsForfaitAdd from './pages/FraisHorsForfaitAdd'
import FraisHorsForfaitEdit from './pages/FraisHorsForfaitEdit'


function App() {
  return (
    <BrowserRouter><AuthProvider>
      <header>
        <Navbar></Navbar>
      </header>

      {/* Routes de l'application */}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/frais/:id/hors-forfait/ajouter" element={<FraisHorsForfaitAdd />} />
        <Route path="/frais/ajouter" element={<FraisAdd />} />
        <Route path="/frais/:id/hors-forfait/modifier/:idHF" element={<FraisHorsForfaitEdit />} />
        <Route path="/frais/modifier/:id" element={<FraisEdit />} />
        <Route path="/frais/:id/hors-forfait" element={<FraisHorsForfait />} />
              <Route 
        path="/dashboard" 
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>}/>
      </Routes></AuthProvider>
    </BrowserRouter>
  );
}


export default App;
