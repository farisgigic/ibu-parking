import React, { useState, useMemo } from 'react';
import FilterButton from '../../FilterButton/FilterButton';
import ActionButton from '../../ActionButton/ActionButton';
import Pagination from '../../PaginationComponent/PaginationComponent';

const mockData = [
  {
    id: 1,
    name: "Alice Johnson",
    major: "Computer Science",
    year: "Sophomore",
    gpa: "3.8",
    university: "Harvard University"
  },
  {
    id: 2,
    name: "Liam Smith",
    major: "Mechanical Engineering",
    year: "Senior",
    gpa: "3.6",
    university: "MIT"
  },
  {
    id: 3,
    name: "Sophia Williams",
    major: "Biology",
    year: "Freshman",
    gpa: "3.9",
    university: "Stanford University"
  },
  {
    id: 4,
    name: "Noah Brown",
    major: "Economics",
    year: "Junior",
    gpa: "3.7",
    university: "Princeton University"
  },
  {
    id: 5,
    name: "Emma Davis",
    major: "Psychology",
    year: "Senior",
    gpa: "3.85",
    university: "Yale University"
  },
  {
    id: 6,
    name: "Oliver Martinez",
    major: "Physics",
    year: "Junior",
    gpa: "3.75",
    university: "Caltech"
  },
  {
    id: 7,
    name: "Ava Garcia",
    major: "Philosophy",
    year: "Sophomore",
    gpa: "3.9",
    university: "Columbia University"
  },
  {
    id: 8,
    name: "Elijah Miller",
    major: "Mathematics",
    year: "Freshman",
    gpa: "3.95",
    university: "University of Chicago"
  },
  {
    id: 9,
    name: "Isabella Wilson",
    major: "Chemistry",
    year: "Senior",
    gpa: "3.65",
    university: "Duke University"
  },
  {
    id: 10,
    name: "James Anderson",
    major: "History",
    year: "Junior",
    gpa: "3.6",
    university: "Brown University"
  },
  {
    id: 11,
    name: "Mia Thomas",
    major: "Political Science",
    year: "Sophomore",
    gpa: "3.7",
    university: "Cornell University"
  },
  {
    id: 12,
    name: "Lucas Taylor",
    major: "English Literature",
    year: "Freshman",
    gpa: "3.8",
    university: "University of Pennsylvania"
  }
];


const StudentsTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [majorFilter, setMajorFilter] = useState(false);
  const [yearFilter, setYearFilter] = useState(false);

  const itemsPerPage = 5;

  const filteredData = useMemo(() => {
    let filtered = mockData;

    if (searchTerm.trim()) {
      filtered = filtered.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.major.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.year.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.university.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [searchTerm]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  React.useEffect(() => {
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

  return (
    <div className="students-container">
      {/* Header */}
      <h1 className="students-header">Students</h1>

      {/* Filters and Search */}
      <div className="filter-search-container">
        <div className="filter-section">
          <span className="filter-label">Filter by:</span>
          <FilterButton
            active={majorFilter}
            onClick={() => setMajorFilter(!majorFilter)}
          >
            Major
          </FilterButton>
          <FilterButton
            active={yearFilter}
            onClick={() => setYearFilter(!yearFilter)}
          >
            Year
          </FilterButton>
        </div>

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

      {/* Results summary */}
      <div className="results-summary">
        Showing {paginatedData.length} of {filteredData.length} students
        {searchTerm && ` for "${searchTerm}"`}
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="students-table">
          <thead className="table-header">
            <tr>
              <th>Name</th>
              <th>Major</th>
              <th>Year</th>
              <th>GPA</th>
              <th>University</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {paginatedData.length > 0 ? (
              paginatedData.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.major}</td>
                  <td>{student.year}</td>
                  <td>{student.gpa}</td>
                  <td>{student.university}</td>
                  <td>
                    <div className="actions-container">
                      <ActionButton onClick={() => handleEdit(student.id)}>
                        <svg className="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </ActionButton>
                      <ActionButton variant="delete" onClick={() => handleDelete(student.id)}>
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

      {/* Pagination */}
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
