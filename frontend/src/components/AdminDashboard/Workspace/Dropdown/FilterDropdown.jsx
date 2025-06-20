const FilterDropdown = ({ 
  options = [], 
  value = '', 
  onChange, 
  placeholder = 'Select option',
  allOptionText = 'All',
  disabled = false,
  className = '',
  label = null
}) => {
  return (
    <div className={`filter-dropdown-container ${className}`}>
      {label && <label className="filter-dropdown-label">{label}</label>}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`filter-dropdown ${disabled ? 'disabled' : ''}`}
      >
        <option value="">{allOptionText}</option>
        {options.map((option, index) => (
          <option key={index} value={option.value || option}>
            {option.label || option}
          </option>
        ))}
      </select>
      <svg 
        className="filter-dropdown-arrow" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
};

export default FilterDropdown;