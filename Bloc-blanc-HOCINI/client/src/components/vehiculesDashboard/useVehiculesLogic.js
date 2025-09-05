import { useState, useEffect } from 'react';
import axios from 'axios';

const baseURI = import.meta.env.VITE_API_BASE_URL;

export const useVehiculesLogic = () => {
  const [vehicules, setVehicules] = useState([]);
  const [form, setForm] = useState({ marque: '', modele: '', annee: '', client_id: '' });
  const [csrfToken, setCsrfToken] = useState('');
  const [editId, setEditId] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios.get(`${baseURI}api/csrf`, { withCredentials: true })
      .then(res => setCsrfToken(res.data.token))
      .catch(err => console.error('Erreur CSRF:', err));

    fetchVehicules();
  }, []);

  const fetchVehicules = () => {
    axios.get(`${baseURI}api/vehicules`, { withCredentials: true })
      .then(res => setVehicules(res.data))
      .catch(err => console.error('Erreur fetch vehicules:', err));
  };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();

    const newErrors = {};
    if (!form.marque.trim()) newErrors.marque = "La marque est obligatoire";
    if (!form.modele.trim()) newErrors.modele = "Le modèle est obligatoire";
    if (form.annee && (form.annee < 1900 || form.annee > new Date().getFullYear())) {
      newErrors.annee = "Année invalide";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    const method = editId ? 'put' : 'post';
    const url = editId ? `${baseURI}api/vehicules/${editId}` : `${baseURI}api/vehicules`;

    axios({ method, url, withCredentials: true, headers: { 'Content-Type': 'application/json' }, data: { ...form, token: csrfToken } })
      .then(() => {
        setForm({ marque: '', modele: '', annee: '', client_id: '' });
        setEditId(null);
        fetchVehicules();
      })
      .catch(err => console.error('Erreur save vehicule:', err));
  };

  const handleEdit = v => {
    setForm({ marque: v.marque, modele: v.modele, annee: v.annee, client_id: v.client_id });
    setEditId(v.id);
  };

  const confirmDelete = id => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const handleDelete = () => {
    axios.delete(`${baseURI}api/vehicules/${deleteId}`, { withCredentials: true, headers: { 'Content-Type': 'application/json' }, data: { token: csrfToken } })
      .then(() => {
        fetchVehicules();
        setShowConfirm(false);
        setDeleteId(null);
      })
      .catch(err => console.error('Erreur delete vehicule:', err));
  };

  return {
    vehicules,
    form,
    csrfToken,
    editId,
    showConfirm,
    errors,
    handleChange,
    handleSubmit,
    handleEdit,
    confirmDelete,
    handleDelete,
    setShowConfirm,
    setEditId,
    setForm
  };
};
