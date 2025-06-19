const ActionButton = ({ children, variant = 'default', onClick }) => (
  <button
    onClick={onClick}
    className={`action-button ${variant === 'delete' ? 'action-button--delete' : ''}`}
  >
    {children}
  </button>
);

export default ActionButton
