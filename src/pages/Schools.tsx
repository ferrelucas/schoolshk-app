import React, { useState, useMemo } from 'react';
import { useSchools } from '../hooks/useSchools';
import type { SchoolFilters } from '../types/school';
import SchoolTable from '../components/SchoolTable';
import SchoolMap from '../components/SchoolMap';
import FilterPanel from '../components/FilterPanel';

const Schools: React.FC = () => {
  const { schools, loading, error } = useSchools();
  const [filters, setFilters] = useState<SchoolFilters>({
    level: 'all',
    category: 'all',
    district: 'all',
    session: 'all',
    studentsGender: 'all'
  });
  const [viewMode, setViewMode] = useState<'table' | 'map'>('table');

  const filteredSchools = useMemo(() => {
    return schools.filter(school => {
      if (filters.level !== 'all') {
        const levelMatch = school['SCHOOL LEVEL'] === filters.level;
        if (!levelMatch) return false;
      }

      if (filters.category !== 'all') {
        const categoryMatch = school['FINANCE TYPE'] === filters.category;
        if (!categoryMatch) return false;
      }

      if (filters.district !== 'all') {
        const districtMatch = school.DISTRICT === filters.district;
        if (!districtMatch) return false;
      }

      if (filters.session !== 'all') {
        const sessionMatch = school.SESSION === filters.session;
        if (!sessionMatch) return false;
      }

      if (filters.studentsGender !== 'all') {
        const genderMatch = school['STUDENTS GENDER'] === filters.studentsGender;
        if (!genderMatch) return false;
      }

      return true;
    });
  }, [schools, filters]);

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
        />
        
        <div className="view-toggle">
          <button 
            className={viewMode === 'table' ? 'active' : ''} 
            onClick={() => setViewMode('table')}
          >
            Table View
          </button>
          <button 
            className={viewMode === 'map' ? 'active' : ''} 
            onClick={() => setViewMode('map')}
          >
            Map View
          </button>
        </div>
      </div>

      <div className="results-count">
        Showing {filteredSchools.length} of {schools.length} schools
      </div>

      {viewMode === 'table' ? (
        <SchoolTable schools={filteredSchools} />
      ) : (
        <SchoolMap schools={filteredSchools} />
      )}
    </div>
  );
};

export default Schools;