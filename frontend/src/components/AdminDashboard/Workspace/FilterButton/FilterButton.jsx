const FilterButton = ({ children, active = false, onClick }) => (
  <button
    onClick={onClick}
    className={`filter-button ${active ? 'filter-button--active' : ''}`}
  >
    {children}
    {active && <span className="filter-button__close">×</span>}
  </button>
);


export default FilterButton
