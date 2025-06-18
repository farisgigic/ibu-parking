const Badge = ({ count, variant = 'danger' }) => (
  <span className={`badge badge-${variant}`}>
    {count}
  </span>
);

export default Badge;