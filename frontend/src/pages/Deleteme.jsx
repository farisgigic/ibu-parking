import React, { useState, useMemo } from 'react';

// Mock data - expanded for better pagination demo
const mockData = [
  {
    id: 1,
    title: "The Seasons",
    artist: "Lee Krasner",
    style: "Abstract Expressionism",
    dimensions: "235.6 × 517.8 cm",
    location: "Whitney Museum of American Art"
  },
  {
    id: 2,
    title: "Blue Poles",
    artist: "Jackson Pollock",
    style: "Abstract Expressionism",
    dimensions: "212.1 × 488.9 cm",
    location: "National Gallery of Australia"
  },
  {
    id: 3,
    title: "The Persistence of Memory",
    artist: "Salvador Dalí",
    style: "Surrealism",
    dimensions: "24 × 33 cm",
    location: "Museum of Modern Art"
  },
  {
    id: 4,
    title: "Guernica",
    artist: "Pablo Picasso",
    style: "Cubism",
    dimensions: "349.3 × 776.6 cm",
    location: "Museo Reina Sofía"
  },
  {
    id: 5,
    title: "The Starry Night",
    artist: "Vincent van Gogh",
    style: "Post-Impressionism",
    dimensions: "73.7 × 92.1 cm",
    location: "Museum of Modern Art"
  },
  {
    id: 6,
    title: "Girl with a Pearl Earring",
    artist: "Johannes Vermeer",
    style: "Baroque",
    dimensions: "44.5 × 39 cm",
    location: "Mauritshuis"
  },
  {
    id: 7,
    title: "The Great Wave off Kanagawa",
    artist: "Katsushika Hokusai",
    style: "Ukiyo-e",
    dimensions: "25.7 × 37.9 cm",
    location: "Metropolitan Museum of Art"
  },
  {
    id: 8,
    title: "American Gothic",
    artist: "Grant Wood",
    style: "Regionalism",
    dimensions: "78 × 65.3 cm",
    location: "Art Institute of Chicago"
  },
  {
    id: 9,
    title: "The Scream",
    artist: "Edvard Munch",
    style: "Expressionism",
    dimensions: "91 × 73.5 cm",
    location: "National Gallery of Norway"
  },
  {
    id: 10,
    title: "Water Lilies",
    artist: "Claude Monet",
    style: "Impressionism",
    dimensions: "200 × 1275 cm",
    location: "Musée de l'Orangerie"
  },
  {
    id: 11,
    title: "Las Meninas",
    artist: "Diego Velázquez",
    style: "Baroque",
    dimensions: "318 × 276 cm",
    location: "Museo del Prado"
  },
  {
    id: 12,
    title: "The Birth of Venus",
    artist: "Sandro Botticelli",
    style: "Renaissance",
    dimensions: "172.5 × 278.9 cm",
    location: "Uffizi Gallery"
  }
];

// Filter Button Component
const FilterButton = ({ children, active = false, onClick }) => (
  <button
    onClick={onClick}
    className={`filter-button ${active ? 'filter-button--active' : ''}`}
  >
    {children}
    {active && <span className="filter-button__close">×</span>}
  </button>
);

// Action Button Component
const ActionButton = ({ children, variant = 'default', onClick }) => (
  <button
    onClick={onClick}
    className={`action-button ${variant === 'delete' ? 'action-button--delete' : ''}`}
  >
    {children}
  </button>
);

// Pagination Component
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

// Main Table Component
const PaintingsTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [artistFilter, setArtistFilter] = useState(false);
  const [styleFilter, setStyleFilter] = useState(false);
  
  const itemsPerPage = 5;
  
  // Filter and search logic
  const filteredData = useMemo(() => {
    let filtered = mockData;
    
    // Apply search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(painting =>
        painting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        painting.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
        painting.style.toLowerCase().includes(searchTerm.toLowerCase()) ||
        painting.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  }, [searchTerm]);
  
  // Pagination logic
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage, itemsPerPage]);
  
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  
  // Reset to page 1 when search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);
  
  const handleEdit = (id) => {
    console.log('Edit painting with id:', id);
  };
  
  const handleDelete = (id) => {
    console.log('Delete painting with id:', id);
  };
  
  const handleAdd = () => {
    console.log('Add new painting');
  };

  return (
    <>
      <style>{`
        /* Container Styles */
        .paintings-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 24px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }

        /* Header Styles */
        .paintings-header {
          font-size: 2rem;
          font-weight: bold;
          color: #1f2937;
          margin-bottom: 24px;
          margin-top: 0;
        }

        /* Filter and Search Container */
        .filter-search-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          gap: 16px;
          flex-wrap: wrap;
        }

        .filter-section {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .filter-label {
          font-size: 0.875rem;
          font-weight: 500;
          color: #374151;
        }

        /* Filter Button Styles */
        .filter-button {
          display: inline-flex;
          align-items: center;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 0.875rem;
          font-weight: 500;
          border: 1px solid #d1d5db;
          background-color: #f9fafb;
          color: #374151;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .filter-button:hover {
          background-color: #f3f4f6;
        }

        .filter-button--active {
          background-color: #3b82f6;
          color: white;
          border-color: #3b82f6;
        }

        .filter-button__close {
          margin-left: 8px;
          font-weight: bold;
        }

        /* Search and Add Section */
        .search-add-section {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .search-container {
          position: relative;
        }

        .search-input {
          padding: 8px 12px 8px 40px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 0.875rem;
          width: 250px;
          outline: none;
          transition: border-color 0.2s ease;
        }

        .search-input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          width: 16px;
          height: 16px;
          color: #9ca3af;
        }

        .add-button {
          padding: 8px;
          background-color: #3b82f6;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .add-button:hover {
          background-color: #2563eb;
        }

        .add-icon {
          width: 20px;
          height: 20px;
        }

        /* Results Summary */
        .results-summary {
          margin-bottom: 16px;
          font-size: 0.875rem;
          color: #6b7280;
        }

        /* Table Container */
        .table-container {
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
          overflow: hidden;
          margin-bottom: 24px;
        }

        /* Table Styles */
        .paintings-table {
          width: 100%;
          border-collapse: collapse;
        }

        .table-header {
          background-color: #f9fafb;
        }

        .table-header th {
          padding: 12px 24px;
          text-align: left;
          font-size: 0.75rem;
          font-weight: 500;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-bottom: 1px solid #e5e7eb;
        }

        .table-body tr {
          border-bottom: 1px solid #e5e7eb;
          transition: background-color 0.2s ease;
        }

        .table-body tr:hover {
          background-color: #f9fafb;
        }

        .table-body tr:last-child {
          border-bottom: none;
        }

        .table-body td {
          padding: 16px 24px;
          font-size: 0.875rem;
          color: #374151;
          white-space: nowrap;
        }

        .table-body td:first-child {
          font-weight: 500;
          color: #1f2937;
        }

        /* Action Buttons */
        .actions-container {
          display: flex;
          gap: 8px;
        }

        .action-button {
          padding: 8px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.2s ease;
          color: #6b7280;
        }

        .action-button:hover {
          background-color: #f3f4f6;
        }

        .action-button--delete {
          color: #dc2626;
        }

        .action-button--delete:hover {
          background-color: #fef2f2;
        }

        .action-icon {
          width: 16px;
          height: 16px;
        }

        /* No Results */
        .no-results {
          padding: 24px;
          text-align: center;
          color: #6b7280;
          font-size: 0.875rem;
        }

        /* Pagination Styles */
        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 4px;
          margin-top: 24px;
        }

        .pagination__nav,
        .pagination__button {
          padding: 8px 12px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.875rem;
          transition: all 0.2s ease;
          background-color: transparent;
          color: #6b7280;
        }

        .pagination__nav:hover:not(.pagination__nav--disabled),
        .pagination__button:hover:not(.pagination__button--active) {
          background-color: #f3f4f6;
        }

        .pagination__nav--disabled {
          color: #d1d5db;
          cursor: not-allowed;
        }

        .pagination__button--active {
          background-color: #3b82f6;
          color: white;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .paintings-container {
            padding: 16px;
          }

          .filter-search-container {
            flex-direction: column;
            align-items: stretch;
          }

          .filter-section {
            justify-content: flex-start;
          }

          .search-add-section {
            justify-content: space-between;
          }

          .search-input {
            width: 200px;
          }

          .table-container {
            overflow-x: auto;
          }

          .paintings-table {
            min-width: 800px;
          }
        }

        @media (max-width: 480px) {
          .paintings-header {
            font-size: 1.5rem;
          }

          .search-input {
            width: 150px;
          }

          .filter-search-container {
            gap: 12px;
          }
        }
      `}</style>

      <div className="paintings-container">
        {/* Header */}
        <h1 className="paintings-header">Paintings</h1>
        
        {/* Filters and Search */}
        <div className="filter-search-container">
          <div className="filter-section">
            <span className="filter-label">Filter by:</span>
            <FilterButton 
              active={artistFilter} 
              onClick={() => setArtistFilter(!artistFilter)}
            >
              Artist
            </FilterButton>
            <FilterButton 
              active={styleFilter} 
              onClick={() => setStyleFilter(!styleFilter)}
            >
              Style
            </FilterButton>
          </div>
          
          <div className="search-add-section">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search paintings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <svg 
                className="search-icon" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <button
              onClick={handleAdd}
              className="add-button"
            >
              <svg className="add-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>

        {/* Results summary */}
        <div className="results-summary">
          Showing {paginatedData.length} of {filteredData.length} paintings
          {searchTerm && ` for "${searchTerm}"`}
        </div>

        {/* Table */}
        <div className="table-container">
          <table className="paintings-table">
            <thead className="table-header">
              <tr>
                <th>Title</th>
                <th>Artist</th>
                <th>Style</th>
                <th>Dimensions</th>
                <th>Location</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {paginatedData.length > 0 ? (
                paginatedData.map((painting) => (
                  <tr key={painting.id}>
                    <td>{painting.title}</td>
                    <td>{painting.artist}</td>
                    <td>{painting.style}</td>
                    <td>{painting.dimensions}</td>
                    <td>{painting.location}</td>
                    <td>
                      <div className="actions-container">
                        <ActionButton onClick={() => handleEdit(painting.id)}>
                          <svg className="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </ActionButton>
                        <ActionButton variant="delete" onClick={() => handleDelete(painting.id)}>
                          <svg className="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </ActionButton>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-results">
                    No paintings found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </>
  );
};

export default PaintingsTable;