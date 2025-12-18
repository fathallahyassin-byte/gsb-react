// src/components/FraisHorsForfaitForm.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL, getAuthToken } from "../services/authService";
import "../styles/FraisForm.css";

function FraisHorsForfaitForm({ idFrais, fraisHF = null }) {
  const [libelle, setLibelle] = useState("");
  const [date, setDate] = useState("");
  const [montant, setMontant] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (fraisHF) {
      setLibelle(fraisHF.lib_fraishorsforfait || "");
      setDate(fraisHF.date_fraishorsforfait || "");
      setMontant(fraisHF.montant_fraishorsforfait || "");
    } else {
      setLibelle("");
      setDate("");
      setMontant("");
    }
  }, [fraisHF]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const token = getAuthToken();
    if (!token) {
      setError("Token manquant");
      setLoading(false);
      return;
    }

    try {
      const apiDate = date.replace(/-/g, "/");
      const data = {
  date: apiDate,           
  libelle: libelle,
  montant: parseFloat(montant),
};

      if (fraisHF) {
        data['id_fraisHF']= fraisHF.id_fraishorsforfait; 
           await axios.post(
          `${API_URL}fraisHF/modif`,
          data,
          {headers: { Authorization: `Bearer ${token}` } }
        );
      } else {

        data['id_frais']=idFrais;         console.log(data);
        await axios.post(
          `${API_URL}fraisHF/ajout`,
          data,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      navigate(`/frais/${idFrais}/hors-forfait`);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Erreur lors de l'enregistrement"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="frais-form-container">
      <form onSubmit={handleSubmit} className="frais-form">
        {error && <div className="error-message">{error}</div>}
        <h3 className="frais-form-title">
          {fraisHF ? "Modifier un frais hors forfait" : "Saisir un frais hors forfait"}
        </h3>

        <div className="form-group">
          <label>Libellé :</label>
          <input
            type="text"
            value={libelle}
            onChange={(e) => setLibelle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Date :</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Montant :</label>
          <input
            type="number"
            step="0.01"
            value={montant}
            onChange={(e) => setMontant(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading
            ? fraisHF
              ? "Enregistrement..."
              : "Ajout..."
            : fraisHF
            ? "Enregistrer"
            : "Ajouter"}
        </button>
      </form>
    </div>
  );
}

export default FraisHorsForfaitForm;
