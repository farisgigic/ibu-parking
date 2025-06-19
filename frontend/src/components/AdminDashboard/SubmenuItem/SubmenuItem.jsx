import { useNavigate } from 'react-router-dom';

const SubmenuItem = ({ item, isActive, onClick }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => {
        onClick(item.id);
        if (item.path) {
          navigate(item.path);
        }
      }}
      className={`submenu-item ${isActive ? 'active' : ''}`}
    >
      {item.label}
    </button>
  );
};

export default SubmenuItem;
