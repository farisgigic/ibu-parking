import { useEffect, useState, useMemo } from 'react';
import ActionButton from '../../ActionButton/ActionButton';
import Pagination from '../../PaginationComponent/PaginationComponent';
import FilterDropdown from '../../Dropdown/FilterDropdown';
import { reportsApi } from '../../../../../api/ReportsApi'; 
import ConfirmModal from '../../confirm-modal/ConfirmModal';

const ReportsTable = () => {
  const [reports, setReports] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState('');

  const itemsPerPage = 5;

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const data = await reportsApi.getAllReports();
        setReports(data);
      } catch (err) {
        setError('Failed to load reports');
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  const filteredData = useMemo(() => {
    let filtered = reports;

    // Apply search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(report =>
        report.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.priority.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.issue_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.student_id.toString().includes(searchTerm.toLowerCase())
      );
    }

    // Apply priority filter
    if (priorityFilter) {
      filtered = filtered.filter(report => report.priority === priorityFilter);
    }

    // Apply category filter
    if (categoryFilter) {
      filtered = filtered.filter(report => report.category === categoryFilter);
    }

    return filtered;
  }, [searchTerm, priorityFilter, categoryFilter, reports]);

  // Get unique priorities and categories for filter dropdowns
  const uniquePriorities = useMemo(() => {
    return [...new Set(reports.map(report => report.priority))].filter(Boolean);
  }, [reports]);

  const uniqueCategories = useMemo(() => {
    return [...new Set(reports.map(report => report.category))].filter(Boolean);
  }, [reports]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, priorityFilter, categoryFilter]);

  const handleViewImage = (pictureUrl) => {
    if (pictureUrl && pictureUrl.trim() !== '') {
      // Dodaj base URL ako je potrebno
      const fullImageUrl = pictureUrl.startsWith('http') 
        ? pictureUrl 
        : `${window.location.origin}/${pictureUrl.replace(/^\//, '')}`;
      
      setSelectedImageUrl(fullImageUrl);
      setShowImageModal(true);
    }
  };

  const handleDelete = (id) => {
    const reportToDelete = reports.find(r => r.id === id);
    setSelectedReport(reportToDelete);
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    try {
      await reportsApi.deleteReport(selectedReport.id);
      setReports(reports.filter(r => r.id !== selectedReport.id));
      setShowConfirmModal(false); 
      setSelectedReport(null);
    } catch (err) { 
      console.error('Delete failed:', err);
      setError('Failed to delete report');
    }
  };

  const cancelDelete = () => {
    setShowConfirmModal(false);
    setSelectedReport(null);
  };

  const handleAdd = () => {
    console.log('Add new report');
  };

  const closeImageModal = () => {
    setShowImageModal(false);
    setSelectedImageUrl('');
  };

  if (loading) return <div>Loading reports...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="students-container">
      <h1 className="students-header">Reports</h1>

      <div className="filter-search-container">
        <div className="search-add-section">
          {/* Left side - Search and Add button */}
          <div className="search-left-section">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <button onClick={handleAdd} className="add-button">
              <svg className="add-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>

          {/* Right side - Filters */}
          <div className="filters-right-section">
            <div className="filters-container">
              <FilterDropdown 
                options={uniquePriorities}
                value={priorityFilter}
                onChange={setPriorityFilter}
                allOptionText="All Priorities"
                placeholder="Select Priority"
                className="priority-filter"
              />
              <FilterDropdown
                options={uniqueCategories}
                value={categoryFilter}
                onChange={setCategoryFilter}
                allOptionText="All Categories"
                placeholder="Select Category"
                className="category-filter"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="results-summary">
        Showing {paginatedData.length} of {filteredData.length} reports
        {searchTerm && ` for "${searchTerm}"`}
        {priorityFilter && ` with priority "${priorityFilter}"`}
        {categoryFilter && ` in category "${categoryFilter}"`}
      </div>

      <div className="table-container">
        <table className="students-table">
          <thead className="table-header">
            <tr>
              <th>ID</th>
              <th>Category</th>
              <th>Priority</th>
              <th>Issue Title</th>
              <th>Description</th>
              <th>Student ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {paginatedData.length > 0 ? (
              paginatedData.map((report) => (
                <tr key={report.id}>
                  <td>{report.id}</td>
                  <td>{report.category}</td>
                  <td>
                    <span className={`priority-badge priority-${report.priority.toLowerCase()}`}>
                      {report.priority}
                    </span>
                  </td>
                  <td>{report.issue_title}</td>
                  <td>
                    <div className="description-cell" title={report.description}>
                      {report.description.length > 50 
                        ? `${report.description.substring(0, 50)}...` 
                        : report.description}
                    </div>
                  </td>
                  <td>{report.student_id}</td>
                  <td>
                    <div className="actions-container">
                      <ActionButton 
                        onClick={() => handleViewImage(report.picture_url)}
                        disabled={!report.picture_url || report.picture_url.trim() === '' || report.picture_url === null}
                        title={report.picture_url && report.picture_url.trim() !== '' ? "View Image" : "No image available"}
                      >
                        <svg className="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </ActionButton>
                      <ActionButton variant="delete" onClick={() => handleDelete(report.id)}>
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
                <td colSpan="7" className="no-results">
                  No reports found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      {showConfirmModal && (
        <ConfirmModal
          message="Are you sure you want to delete this report from system?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}

      {/* Image Modal */}
      {showImageModal && selectedImageUrl && (
        <div className="modal-overlay" onClick={closeImageModal}>
          <div className="image-modal" onClick={(e) => e.stopPropagation()}>
            <div className="image-modal-header">
              <h3>Report Image</h3>
              <button className="close-button" onClick={closeImageModal}>
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="image-modal-content">
              <img 
                src={selectedImageUrl} 
                alt="Report" 
                className="modal-image"
                crossOrigin="anonymous"
                onError={(e) => {
                  console.error('Failed to load image:', selectedImageUrl);
                  const errorDiv = document.createElement('div');
                  errorDiv.className = 'image-error';
                  errorDiv.innerHTML = `
                    <div class="error-icon">📷</div>
                    <p>Failed to load image</p>
                    <small>${selectedImageUrl}</small>
                  `;
                  e.target.parentElement.appendChild(errorDiv);
                  e.target.style.display = 'none';
                }}
                onLoad={() => {
                //   console.log('Image loaded successfully:', selectedImageUrl);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsTable;