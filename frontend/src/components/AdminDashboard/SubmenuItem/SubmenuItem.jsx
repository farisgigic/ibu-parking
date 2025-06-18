const SubmenuItem = ({ item, isActive, onClick }) => {
  return (
    <button
      onClick={() => onClick(item.id)}
      className={`submenu-item ${isActive ? 'active' : ''}`}
    >
      {item.label}
    </button>
  );
};

export default SubmenuItem;