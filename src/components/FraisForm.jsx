import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { API_URL, getCurrentUser } from "../services/authService";
import '../styles/FraisForm.css';

function FraisForm({ frais = null }) {
  const [idFrais, setIdFrais] = useState(null);
  const [anneeMois, setAnneeMois] = useState('');
  const [nbJustificatifs, setNbJustificatifs] = useState('');
  const [montantvalide, setMontant] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (frais) {
      setIdFrais(frais.id_frais);
      setAnneeMois(frais.anneemois || '');
      setNbJustificatifs(frais.nbjustificatifs || '');
      setMontant(frais.montantvalide || '');
    } else {
      setIdFrais(null);
      setAnneeMois('');
      setNbJustificatifs('');
      setMontant('');
    }
  }, [frais]);

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');
  const token = localStorage.getItem('token');
  if (!token) {
    setError("Token manquant");
    setLoading(false);
    return;
  }
  try {
    let response;
    if (frais) {
      const fraisData = {
        id_frais: idFrais,  
        anneemois: anneeMois,
        nbjustificatifs: parseInt(nbJustificatifs, 10),
        montantvalide: parseFloat(montantvalide)
      };
      response = await axios.post(
        `${API_URL}frais/modif`,
        fraisData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } else {
      const fraisData = {
        anneemois: anneeMois,
        nbjustificatifs: parseInt(nbJustificatifs, 10),
        montantvalide: parseFloat(montantvalide),
        id_visiteur: getCurrentUser()["id_visiteur"]
      };
      response = await axios.post(
        `${API_URL}frais/ajout`,
        fraisData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }
    navigate('/dashboard');
  } catch (err) {
    setError(err.response?.data?.message || err.message || "Erreur lors de l'enregistrement");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="frais-form-container">
      <form onSubmit={handleSubmit} className="frais-form">
        {error && <div className="error-message">{error}</div>}
        <h2 className="frais-form-title">{frais ? "Modifier un frais" : "Saisir un frais"}</h2>
        <div className="frais-form-subtitle">
          Année-Mois (ex: 202310):
        </div>
        <div className="form-group">
          <label>Année-Mois :</label>
          <input
            type="text"
            value={anneeMois}
            onChange={e => setAnneeMois(e.target.value)}
            placeholder="202310"
            required
          />
        </div>
        <div className="form-group">
          <label>Nombre de justificatifs :</label>
          <input
            type="number"
            value={nbJustificatifs}
            onChange={e => setNbJustificatifs(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Montant :</label>
          <input
            type="number"
            step="0.01"
            value={montantvalide}
            onChange={e => setMontant(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? (frais ? "Enregistrement..." : "Ajout...") : (frais ? "Enregistrer" : "Ajouter")}
        </button>
        <Link className="frais-hors-forfait-link" to={`/frais/${idFrais}/hors-forfait`}>Frais hors forfait</Link>
      </form>
    </div>
  );
}

export default FraisForm;
