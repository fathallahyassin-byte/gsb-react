// src/components/FraisHorsForfaitTable.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/FraisTable.css";

function FraisHorsForfaitTable({
  idFrais,
  fraisHorsForfaitList,
  total,
  handleDelete,
}) {
  const navigate = useNavigate();

  return (
    <div className="frais-table-container">
      <h2>Frais hors forfait du frais {idFrais}</h2>
      <table className="frais-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Libellé</th>
            <th>Date</th>
            <th>Montant</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {fraisHorsForfaitList.length === 0 ? (
            <tr>
              <td colSpan="5">Aucun frais hors forfait pour ce frais.</td>
            </tr>
          ) : (
            fraisHorsForfaitList.map((fraisHF) => (
              <tr key={fraisHF.id_fraishorsforfait}>
                <td>{fraisHF.id_fraishorsforfait}</td>
                <td>{fraisHF.lib_fraishorsforfait}</td>
                <td>{fraisHF.date_fraishorsforfait}</td>
                <td>{fraisHF.montant_fraishorsforfait} €</td>
                <td>
                  <button
                    onClick={() =>
                      navigate(
                        `/frais/${idFrais}/hors-forfait/modifier/${fraisHF.id_fraishorsforfait}`
                      )
                    }
                  >
                    Modifier
                  </button>
                  <button
                    style={{ marginLeft: "8px" }}
                    onClick={() =>
                      handleDelete(fraisHF.id_fraishorsforfait)
                    }
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div style={{ marginTop: "10px", fontWeight: "bold" }}>
        Total des frais hors forfait : {total.toFixed(2)} €
      </div>

      <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
        <button onClick={() => navigate(`/frais/modifier/${idFrais}`)}>
          Retour
        </button>
        <button onClick={() => navigate(`/frais/${idFrais}/hors-forfait/ajouter`)}>
          Ajout
        </button>
      </div>
    </div>
  );
}

export default FraisHorsForfaitTable;
