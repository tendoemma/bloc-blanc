const ConfirmModal = ({ onConfirm, onCancel }) => (
  <div className="modal-overlay">
    <div className="modal">
      <h3>Confirmer la suppression</h3>
      <p>Voulez-vous vraiment supprimer ce véhicule ?</p>
      <button onClick={onConfirm}>Oui</button>
      <button onClick={onCancel}>Annuler</button>
    </div>
  </div>
);

export default ConfirmModal;
