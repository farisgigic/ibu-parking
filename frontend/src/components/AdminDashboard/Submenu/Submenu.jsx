import SubmenuItem from "../SubmenuItem/SubmenuItem";

const Submenu = ({ items, activeItem, onItemClick, isExpanded }) => {
  if (!isExpanded) return null;

  return (
    <div className="submenu">
      {items.map((subItem) => (
        <SubmenuItem
          key={subItem.id}
          item={subItem}
          isActive={activeItem === subItem.id}
          onClick={onItemClick}
        />
      ))}
    </div>
  );
};


export default Submenu;