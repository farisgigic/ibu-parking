const ConfirmModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{message || 'Are you sure?'}</h3>
        <div className="modal-buttons">
          <button onClick={onConfirm} className="confirm-button">Yes</button>
          <button onClick={onCancel} className="cancel-button">No</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
