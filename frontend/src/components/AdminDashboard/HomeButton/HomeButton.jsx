import { Home } from 'lucide-react';

const HomeButton = ({ isActive, onClick }) => {
  return (
    <div className="sidebar-home">
      <button
        onClick={() => onClick('home')}
        className={`home-button ${isActive ? 'active' : ''}`}
      >
        <Home size={20} />
        <span>Home</span>
      </button>
    </div>
  );
};

export default HomeButton;