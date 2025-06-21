const Toast = ({ show, message, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      color: 'white',
      padding: '20px 25px',
      borderRadius: '15px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
      zIndex: 1000,
      animation: 'slideIn 0.3s ease-out',
      backdropFilter: 'blur(10px)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '16px' }}>{message}</span>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '20px',
            cursor: 'pointer',
            marginLeft: '15px'
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Toast;