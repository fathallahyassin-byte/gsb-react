import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../services/authService";
import FraisHorsForfaitForm from "../components/FraisHorsForfaitForm";
import {useAuth}from "../context/AuthContext"

function FraisHorsForfaitEdit() {
  const { id, idHF } = useParams();
  const [fraisHorsForfait, setFraisHorsForfait] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { token } = useAuth();

  useEffect(() => {
    const fetchFraisHorsForfait = async () => {
      try {
        const response = await axios.get(
          `${API_URL}fraisHF/${idHF}`
        ,{headers : {Authorization :`Bearer ${token}`}});
        setFraisHorsForfait(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Erreur lors du chargement du frais hors forfait"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchFraisHorsForfait();
  }, [idHF]);

  if (loading) return <div>Chargement du frais hors forfait...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="frais-form-container">
      <h2>Modifier un frais hors forfait (frais {id})</h2>
      <FraisHorsForfaitForm idFrais={id} fraisHF={fraisHorsForfait} />
    </div>
  );
}

export default FraisHorsForfaitEdit;
