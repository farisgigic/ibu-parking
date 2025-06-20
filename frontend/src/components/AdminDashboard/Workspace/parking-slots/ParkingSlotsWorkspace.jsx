import { useEffect, useState, useMemo } from 'react';
import ActionButton from '../ActionButton/ActionButton';
import Pagination from '../PaginationComponent/PaginationComponent';
import { slotsApi } from '../../../../api/ParkingSlotsApi';
import EditSlotForm from './edit-parking-slot/EditSlotForm'; 
import ConfirmModal from '../confirm-modal/ConfirmModal';

const SlotsTable = () => {
  const [slots, setSlots] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const itemsPerPage = 5;

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        setLoading(true);
        const data = await slotsApi.getAll();
        setSlots(data);
      } catch (err) {
        setError('Failed to load slots');
      } finally {
        setLoading(false);
      }
    };
    fetchSlots();
  }, []);

  const filteredData = useMemo(() => {
  let filtered = slots;

  if (searchTerm.trim()) {
    const lowerSearch = searchTerm.toLowerCase();
    filtered = filtered.filter(slot =>
      slot.slot_code?.toLowerCase().includes(lowerSearch) ||
      slot.location?.toLowerCase().includes(lowerSearch) ||
      slot.section?.toLowerCase().includes(lowerSearch) ||
      slot.type?.toLowerCase().includes(lowerSearch) ||
      (typeof slot.reserved_by === 'string' && slot.reserved_by.toLowerCase().includes(lowerSearch))
    );
  }

  return filtered;
}, [searchTerm, slots]);


  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleEdit = (id) => {
    const slotToEdit = slots.find(s => s.id === id);
    setSelectedSlot(slotToEdit);
    setShowEditModal(true);
  };

  const handleUpdate = async () => {
    const data = await slotsApi.getAll();
    setSlots(data);
  };

  const handleDelete = (id) => {
    const slotToDelete = slots.find(s => s.id === id);
    setSelectedSlot(slotToDelete);
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    try {
      await slotsApi.deleteSlot(selectedSlot.id);
      setSlots(slots.filter(s => s.id !== selectedSlot.id));
      setShowConfirmModal(false); 
      setSelectedSlot(null);
    } catch (err) { 
      console.error('Delete failed:', err);
      setError('Failed to delete slot');
    }
  };

  const cancelDelete = () => {
    setShowConfirmModal(false);
    setSelectedSlot(null);
  };

  const handleAdd = () => {
    console.log('Add new slot');
  };

  const getStatusBadge = (slot) => {
    if (!slot.is_available) {
      return <span className="status-badge reserved">Reserved</span>;
    }
    return <span className="status-badge available">Available</span>;
  };

  if (loading) return <div>Loading slots...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="students-container">
      <h1 className="students-header">Parking Slots</h1>

      <div className="filter-search-container">
        <div className="search-add-section">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search slots..."
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
      </div>

      {/* Edit form appears here - above the table */}
      {showEditModal && selectedSlot && (
        <EditSlotForm
          slot={selectedSlot}
          onClose={() => setShowEditModal(false)}
          onUpdate={handleUpdate}
        />
      )}

      <div className="results-summary">
        Showing {paginatedData.length} of {filteredData.length} slots
        {searchTerm && ` for "${searchTerm}"`}
      </div>

      <div className="table-container">
        <table className="students-table">
          <thead className="table-header">
            <tr>
              <th>Slot Code</th>
              <th>Location</th>
              <th>Section</th>
              <th>Type</th>
              <th>Locked</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {paginatedData.length > 0 ? (
              paginatedData.map((slot) => (
                // console.log(slot),
                <tr key={slot.id}>
                  <td>{slot.slot_code}</td>
                  <td>{slot.location}</td>
                  <td>{slot.section}</td>
                  <td>{slot.type}</td>
                  <td>{slot.is_locked ? 'Yes' : 'No'}</td>
                  <td>{getStatusBadge(slot)}</td>
                  <td>
                    <div className="actions-container">
                      <ActionButton onClick={() => handleEdit(slot.id)}>
                        <svg className="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </ActionButton>
                      <ActionButton variant="delete" onClick={() => handleDelete(slot.id)}>
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
                <td colSpan="8" className="no-results">
                  No slots found matching your search.
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
          message="Are you sure you want to delete this slot from system?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default SlotsTable;