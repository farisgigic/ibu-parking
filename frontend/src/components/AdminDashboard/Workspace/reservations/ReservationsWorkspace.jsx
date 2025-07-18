import { useEffect, useState, useMemo } from 'react';
import ActionButton from '../ActionButton/ActionButton';
import Pagination from '../PaginationComponent/PaginationComponent';
import ConfirmModal from '../confirm-modal/ConfirmModal';
import EditReservationForm from './edit-reservation/EditReservationForm';
import FilterDropdown from '../Dropdown/FilterDropdown'; 
import { reservationApi } from '../../../../api/ReservationApi';

const ReservationsTable = () => {
  const [reservations, setReservations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState(''); // Add status filter state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedReservationId, setSelectedReservationId] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  const itemsPerPage = 5;

  // Status options for the dropdown
  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'accepted/paid', label: 'Accepted/Paid' },
    { value: 'rejected', label: 'Rejected' }
  ];

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const data = await reservationApi.getAllReservations();
      setReservations(data);
    } catch (err) {
      setError('Failed to load reservations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const filteredData = useMemo(() => {
    let filtered = reservations;

    // Filter by search term
    if (searchTerm.trim()) {
      filtered = filtered.filter(reservation =>
        reservation.student.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reservation.student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reservation.slot.slot_code.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter) {
      filtered = filtered.filter(reservation => 
        reservation.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    return filtered;
  }, [searchTerm, statusFilter, reservations]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]); // Reset page when filters change

  const handleEdit = (id) => {
    const reservationToEdit = reservations.find(r => r.id === id);
    setSelectedReservation(reservationToEdit);
    setShowEditForm(true);
  };

  const handleUpdate = async () => {
    await fetchReservations();
  };

  const handleDelete = (id) => {
    setSelectedReservationId(id);
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    try {
      await reservationApi.deleteReservation(selectedReservationId);
      setShowConfirmModal(false);
      setSelectedReservationId(null);
      await fetchReservations();
    } catch (err) {
      console.error('Delete failed:', err);
      setError('Failed to delete reservation');
    }
  };

  const cancelDelete = () => {
    setShowConfirmModal(false);
    setSelectedReservationId(null);
  };

  if (loading) return <div>Loading reservations...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="students-container">
      <h1 className="students-header">Reservations</h1>

      <div className="filter-search-container">
        <div className="search-add-section">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search reservations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          {/* Add status filter dropdown */}
          <FilterDropdown
            options={statusOptions}
            value={statusFilter}
            onChange={setStatusFilter}
            placeholder="Filter by status"
            allOptionText="All Statuses"
            className="status-filter"
          />
        </div>
      </div>

      {/* Edit form appears here - above the table */}
      {showEditForm && selectedReservation && (
        <EditReservationForm
          reservation={selectedReservation}
          onClose={() => setShowEditForm(false)}
          onUpdate={handleUpdate}
        />
      )}

      <div className="results-summary">
        Showing {paginatedData.length} of {filteredData.length} reservations
        {searchTerm && ` for "${searchTerm}"`}
        {statusFilter && ` with status "${statusOptions.find(opt => opt.value === statusFilter)?.label}"`}
      </div>

      <div className="table-container">
        <table className="students-table">
          <thead className="table-header">
            <tr>
              <th>Student</th>
              <th>Email</th>
              <th>Slot</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {paginatedData.length > 0 ? (
              paginatedData.map((reservation) => (
                <tr key={reservation.id}>
                  <td>{reservation.student.full_name}</td>
                  <td>{reservation.student.email}</td>
                  <td>{reservation.slot.slot_code}</td>
                  <td>
                    {reservation.reservations_start_date &&
                      !isNaN(new Date(reservation.reservations_start_date))
                      ? new Date(reservation.reservations_start_date).toLocaleDateString()
                      : 'N/A'}
                  </td>
                  <td>
                    {reservation.reservations_end_date &&
                      !isNaN(new Date(reservation.reservations_end_date))
                      ? new Date(reservation.reservations_end_date).toLocaleDateString()
                      : 'N/A'}
                  </td>
                  <td>
                    <span className={`status-badge status-${reservation.status.toLowerCase()}`}>
                      {reservation.status}
                    </span>
                  </td>
                  <td>
                    <div className="actions-container">
                      <ActionButton onClick={() => handleEdit(reservation.id)}>
                        <svg className="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </ActionButton>
                      <ActionButton variant="delete" onClick={() => handleDelete(reservation.id)}>
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
                  No reservations found matching your criteria.
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
          message="Are you sure you want to cancel this reservation?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default ReservationsTable;