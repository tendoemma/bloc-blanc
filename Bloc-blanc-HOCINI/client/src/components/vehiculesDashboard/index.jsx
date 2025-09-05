import './styles.css';
import ConfirmModal from './modal';
import { useVehiculesLogic } from './useVehiculesLogic';

const VehiculesDashboard = () => {
  const {
    vehicules,
    form,
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
  } = useVehiculesLogic();

  return (
    <div className="vehicules-dashboard">
      <h2>Gestion des véhicules</h2>

      <form onSubmit={handleSubmit}>
        <input name="marque" placeholder="Marque" value={form.marque} onChange={handleChange} required />
        {errors.marque && <span className="error">{errors.marque}</span>}

        <input name="modele" placeholder="Modèle" value={form.modele} onChange={handleChange} required />
        {errors.modele && <span className="error">{errors.modele}</span>}

        <input name="annee" placeholder="Année" value={form.annee} onChange={handleChange} type="number" />
        {errors.annee && <span className="error">{errors.annee}</span>}

        <input name="client_id" placeholder="Client ID" value={form.client_id} onChange={handleChange} type="number" />

        <button type="submit">{editId ? 'Modifier' : 'Ajouter'}</button>
        {editId && (
          <button type="button" onClick={() => {
            setEditId(null);
            setForm({ marque: '', modele: '', annee: '', client_id: '' });
          }}>
            Annuler
          </button>
        )}
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Marque</th>
            <th>Modèle</th>
            <th>Année</th>
            <th>Client ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vehicules.map(v => (
            <tr key={v.id}>
              <td>{v.id}</td>
              <td>{v.marque}</td>
              <td>{v.modele}</td>
              <td>{v.annee}</td>
              <td>{v.client_id}</td>
              <td>
                <button onClick={() => handleEdit(v)}>Modifier</button>
                <button onClick={() => confirmDelete(v.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showConfirm && <ConfirmModal onConfirm={handleDelete} onCancel={() => setShowConfirm(false)} />}
    </div>
  );
};

export default VehiculesDashboard;
