import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronRight } from "lucide-react";
import Badge from "../Badge/Badge";
import Submenu from "../Submenu/Submenu";
import IconRenderer from "../IconRenderer/IconRenderer";

const MenuItem = ({ 
  item, 
  isActive, 
  isExpanded, 
  onItemClick, 
  onToggleExpand,
  onSubmenuClick,
  activeItem 
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (item.hasSubmenu) {
      onToggleExpand(item.id);
    } else {
      onItemClick(item.id);
      if (item.path) {
        navigate(item.path); 
      }
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className={`menu-item ${isActive ? 'active' : ''}`}
      >
        <div className="menu-item-content">
          <IconRenderer iconName={item.iconName} />
          <span>{item.label}</span>
          {item.badge && (
            <Badge count={item.badge} variant="danger" />
          )}
        </div>
        {item.hasSubmenu && (
          <div className="menu-item-expand">
            {isExpanded ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </div>
        )}
      </button>

      {item.hasSubmenu && (
        <Submenu
          items={item.submenu}
          activeItem={activeItem}
          onItemClick={onSubmenuClick}
          isExpanded={isExpanded}
        />
      )}
    </div>
  );
};

export default MenuItem;
