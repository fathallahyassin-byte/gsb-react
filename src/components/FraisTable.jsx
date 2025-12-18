import axios from "axios"; 
import { useEffect, useState } from "react";
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../services/authService';
import { useNavigate } from "react-router-dom";
import '../styles/FraisTable.css';

function FraisTable() {
  const { user, token } = useAuth();
  const [fraisList, setFraisList] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [searchTerm , setSearchTerm] = useState("");
  const [filterNonNull, setfilterNonNull]= useState(true);
  const [filterAmount, setFilterAmount] = useState('');
  const threshold = parseFloat(filterAmount);
  const navigate=useNavigate(); 
  
  const handleDelete=async(id)=>{
  if (!window.confirm('Etes-vous sur de vouloir supprimer ce frais ?')) return;
  try { await axios.delete(`${API_URL}frais/suppr`, 
    
    { data : {id_frais : id  }, 
    headers : {Authorization :`Bearer ${token}` } 
  } 
  ); 
    setFraisList(fraisList.filter((frais) => frais.id_frais !== id)); 
  } catch (error) { 
    console.error('Erreur lors de la suppression:', error); } 
  };

  useEffect(() => {
    const fetchFrais = async () => {
      if (!user || !token) return;
      try {
        const response = await axios.get(`${API_URL}frais/liste/${user.id_visiteur}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFraisList(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des frais:', error);
        setFraisList([]);
      }
      setLoading(false);
    };
    fetchFrais();
  }, [user, token]);

  if (loading) return <div><b>Chargement des frais...</b></div>;

  const filteredFrais = fraisList
    .filter(f => !filterNonNull || f.montantvalide !== null)
    .filter(frais =>
      frais.anneemois.includes(searchTerm) ||
      frais.id_visiteur.toString().includes(searchTerm)
    )
    .filter(frais =>
      isNaN(threshold) ? true : (frais.montantvalide !== null && frais.montantvalide > threshold)
    );
    
  return (
    <>
      <div className="filter-container">
        <label>
          <input type="checkbox"
            checked={filterNonNull}
            onChange={(e)=> setfilterNonNull(e.target.checked)}
          />
          Afficher seulement les frais avec un montant Validé
        </label>
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Rechercher par année-mois, ID visiteur ou montant..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="filter-amount-container">
        <label>
          Montant validé supérieur à :
          <input 
            type="number" 
            value={filterAmount} 
            onChange={(e) => setFilterAmount(e.target.value)} 
            placeholder="0"
          />
        </label>
      </div>
      <div className="frais-table-container">
        <h2>Liste des Frais</h2>
        <table className="frais-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>ID Etat</th>
              <th>Année-Mois</th>
              <th>ID Visiteur</th>
              <th>Nombre de justificatifs</th>
              <th>Date de modification</th>
              <th>Montant Validé</th>
              <th>Action</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredFrais.map((frais) => (
              <tr key={frais.id_frais}>
                <td>{frais.id_frais}</td>
                <td>{frais.id_etat}</td>
                <td>{frais.anneemois}</td>
                <td>{frais.id_visiteur}</td>
                <td>{frais.nbjustificatifs}</td>
                <td>{frais.datemodification}</td>
                <td>{frais.montantvalide !== null ? frais.montantvalide + " €" : ''}</td>
                <td> <button onClick={() => navigate(`/frais/modifier/${frais.id_frais}`)} 
                className="edit-button" > 
                Modifier 
                </button></td>
                <td><button onClick={() => handleDelete(frais.id_frais)} className="delete-button">
  Supprimer
</button>
 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default FraisTable;
