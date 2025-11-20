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
        <Route path="/frais/ajouter" element={<FraisAdd />} />
        <Route path="/frais/modifier/:id" element={<FraisEdit />} />
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
