const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={`pagination__nav ${currentPage === 1 ? 'pagination__nav--disabled' : ''}`}
      >
        ‹
      </button>
      
      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`pagination__button ${page === currentPage ? 'pagination__button--active' : ''}`}
        >
          {page}
        </button>
      ))}
      
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={`pagination__nav ${currentPage === totalPages ? 'pagination__nav--disabled' : ''}`}
      >
        ›
      </button>
    </div>
  );
};

export default Pagination
