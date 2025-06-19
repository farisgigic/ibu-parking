import React, { useEffect, useState, useMemo } from 'react';
import FilterButton from '../../FilterButton/FilterButton';
import ActionButton from '../../ActionButton/ActionButton';
import Pagination from '../../PaginationComponent/PaginationComponent';
import { studentApi } from '../../../../../api/studentApi';

const StudentsTable = () => {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const itemsPerPage = 5;

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const data = await studentApi.getAllStudents();
        setStudents(data);
      } catch (err) {
        setError('Failed to load students');
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const filteredData = useMemo(() => {
    let filtered = students;

    if (searchTerm.trim()) {
      filtered = filtered.filter(student =>
        `${student.first_name} ${student.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.role.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [searchTerm, students]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleEdit = (id) => {
    console.log('Edit student with id:', id);
  };

  const handleDelete = (id) => {
    console.log('Delete student with id:', id);
  };

  const handleAdd = () => {
    console.log('Add new student');
  };

  if (loading) return <div>Loading students...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="students-container">
      <h1 className="students-header">Students</h1>

      <div className="filter-search-container">
        <div className="search-add-section">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search students..."
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

      <div className="results-summary">
        Showing {paginatedData.length} of {filteredData.length} students
        {searchTerm && ` for "${searchTerm}"`}
      </div>

      <div className="table-container">
        <table className="students-table">
          <thead className="table-header">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Login Count</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {paginatedData.length > 0 ? (
              paginatedData.map((student) => (
                <tr key={student.student_id}>
                  <td>{student.first_name} {student.last_name}</td>
                  <td>{student.email}</td>
                  <td>{student.role}</td>
                  <td>{student.login_count}</td>
                  <td>
                    {student.createdAt && !isNaN(new Date(student.createdAt))
                      ? new Date(student.createdAt).toLocaleDateString()
                      : 'N/A'}
                  </td>
                  <td>
                    <div className="actions-container">
                      <ActionButton onClick={() => handleEdit(student.student_id)}>
                        <svg className="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </ActionButton>
                      <ActionButton variant="delete" onClick={() => handleDelete(student.student_id)}>
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
                  No students found matching your search.
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
    </div>
  );
};

export default StudentsTable;
