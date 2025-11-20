import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import FraisForm from "../components/FraisForm";

function FraisEdit() {
    const { id } = useParams();
    const { token } = useAuth();
    const [frais, setFrais] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => { const fetchFrais = async () => { 
        try { 
            const token = localStorage.getItem('token'); 
            const response = await 
            axios.get(`${API_URL}frais/${id}`, { 
                headers: { Authorization: `Bearer ${token}` }, 
            }); setFrais(response.data); 
        } catch (error) { 
            console.error('Erreur:', error); } 
            finally { setLoading(false); } }; fetchFrais(); }, [id]);

    if (loading) return <div>Chargement...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="frais-edit-container">
            <h2>Modifier une note de frais</h2>
            <FraisForm frais={frais} />
        </div>
    );
}

export default FraisEdit;
