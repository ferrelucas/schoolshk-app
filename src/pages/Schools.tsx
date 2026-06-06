import React, { useState, useMemo, useEffect } from 'react';
import { useSchools } from '../hooks/useSchools';
import type { SchoolFilters } from '../types/school';
import SchoolTable from '../components/SchoolTable';
import FilterPanel from '../components/FilterPanel';
import SchoolMap from '../components/SchoolMap';

const PAGE_SIZE_OPTIONS = [25, 50, 100];

const Schools: React.FC = () => {
  const { schools, loading, error } = useSchools();
  const [filters, setFilters] = useState<SchoolFilters>({
    level: 'all',
    category: 'all',
    district: 'all',
    session: 'all',
    studentsGender: 'all'
  });
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [showMap, setShowMap] = useState(false);

  const filteredSchools = useMemo(() => {
    const query = search.trim().toLowerCase();

    return schools.filter(school => {
      if (filters.level !== 'all' && school['SCHOOL LEVEL'] !== filters.level) return false;
      if (filters.category !== 'all' && school['FINANCE TYPE'] !== filters.category) return false;
      if (filters.district !== 'all' && school.DISTRICT !== filters.district) return false;
      if (filters.session !== 'all' && school.SESSION !== filters.session) return false;
      if (filters.studentsGender !== 'all' && school['STUDENTS GENDER'] !== filters.studentsGender) return false;

      if (query) {
        const haystack = [
          school['ENGLISH NAME'],
          school['中文名稱'],
          school['ENGLISH ADDRESS'],
          school['中文地址'],
          school.DISTRICT,
        ].join(' ').toLowerCase();
        if (!haystack.includes(query)) return false;
      }

      return true;
    });
  }, [schools, filters, search]);

  // Reset to the first page whenever the result set changes
  useEffect(() => {
    setPage(1);
  }, [filters, search, pageSize]);

  const handleReset = () => {
    setFilters({ level: 'all', category: 'all', district: 'all', session: 'all', studentsGender: 'all' });
    setSearch('');
  };

  const totalPages = Math.max(1, Math.ceil(filteredSchools.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const pageSchools = filteredSchools.slice(start, start + pageSize);

  if (loading) return <div className="loading">Loading schools...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="schools-page">
      <h1>Hong Kong Schools</h1>

      <div className="controls">
        <FilterPanel
          filters={filters}
          onFiltersChange={setFilters}
          schools={schools}
          search={search}
          onSearchChange={setSearch}
          onReset={handleReset}
        />
      </div>

      <div className="toolbar">
        <button
          className="secondary-button"
          onClick={() => setShowMap(true)}
          disabled={filteredSchools.length === 0}
        >
          View {filteredSchools.length} on map
        </button>
      </div>

      <div className="results-count">
        Showing {filteredSchools.length === 0 ? 0 : start + 1}–
        {start + pageSchools.length} of {filteredSchools.length} matching schools
        {filteredSchools.length !== schools.length && ` (out of ${schools.length} total)`}
      </div>

      <SchoolTable schools={pageSchools} />

      <div className="pagination">
        <div className="page-size">
          <label htmlFor="pageSize">Per page:</label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {PAGE_SIZE_OPTIONS.map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>

        <div className="page-controls">
          <button onClick={() => setPage(1)} disabled={currentPage === 1}>« First</button>
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>‹ Prev</button>
          <span className="page-status">Page {currentPage} of {totalPages}</span>
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>Next ›</button>
          <button onClick={() => setPage(totalPages)} disabled={currentPage === totalPages}>Last »</button>
        </div>
      </div>

      {showMap && (
        <div className="modal-overlay" onClick={() => setShowMap(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{filteredSchools.length} schools on map</h2>
              <button className="modal-close" onClick={() => setShowMap(false)} aria-label="Close map">✕</button>
            </div>
            <div className="modal-filters">
              <FilterPanel
                filters={filters}
                onFiltersChange={setFilters}
                schools={schools}
                search={search}
                onSearchChange={setSearch}
                onReset={handleReset}
              />
            </div>
            <div className="modal-body">
              <SchoolMap schools={filteredSchools} />
            </div>
          </div>
        </div>
      )}

      <footer className="page-footer">
        <p>Made with ❤️ by <strong>ferrelucas</strong></p>
      </footer>
    </div>
  );
};

export default Schools;
