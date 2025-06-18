import MenuItem from "../MenuItem/MenuItem";

const Navigation = ({ menuItems, activeItem, expandedItems, onItemClick, onToggleExpand, onSubmenuClick }) => {
  return (
    <nav className="sidebar-nav">
      {menuItems.map((item) => (
        <MenuItem
          key={item.id}
          item={item}
          isActive={activeItem === item.id}
          isExpanded={expandedItems[item.id]}
          onItemClick={onItemClick}
          onToggleExpand={onToggleExpand}
          onSubmenuClick={onSubmenuClick}
          activeItem={activeItem}
        />
      ))}
    </nav>
  );
};
export default Navigation;