// src/pages/FraisHorsForfait.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { API_URL, getAuthToken } from "../services/authService";
import FraisHorsForfaitTable from "../components/FraisHorsForfaitTable";

function FraisHorsForfait() {
  const { id } = useParams();
  const [fraisHorsForfaitList, setFraisHorsForfaitList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const token = getAuthToken(); // récupérer le token ici

  useEffect(() => {
    const fetchFraisHorsForfaitList = async () => {
      try {
        const response = await axios.get(`${API_URL}fraisHF/liste/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFraisHorsForfaitList(response.data);

        let somme = 0;
        response.data.forEach((f) => {
          somme += parseFloat(f.montant_fraishorsforfait);
        });
        setTotal(somme);
      } catch (error) {
        console.error("Erreur lors de la récupération des frais HF :", error);
        setFraisHorsForfaitList([]);
        setTotal(0);
      } finally {
        setLoading(false);
      }
    };
    fetchFraisHorsForfaitList();
  }, [id, token]);

  const handleDelete = async (idHF) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce frais hors forfait ?")) {
      return;
    }

    try {
      const token = getAuthToken();
      await axios.delete(`${API_URL}fraisHF/suppr`, {
        data: { id_fraisHF: idHF },
        headers: { Authorization: `Bearer ${token}` },
      });

      const updated = fraisHorsForfaitList.filter(
        (f) => f.id_fraishorsforfait !== idHF
      );
      setFraisHorsForfaitList(updated);

      let somme = 0;
      updated.forEach((f) => {
        somme += parseFloat(f.montant_fraishorsforfait);
      });
      setTotal(somme);
      
    } catch (error) {
      console.error("Erreur lors de la suppression du frais hors forfait :", error);
    }
  };

  if (loading) return <div><b>Chargement des frais hors forfait...</b></div>;

  return (
    <div className="frais-hf-page">
      <h2>Frais hors forfait du frais {id}</h2>
      <FraisHorsForfaitTable
        idFrais={id}
        fraisHorsForfaitList={fraisHorsForfaitList}
        total={total}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default FraisHorsForfait;
