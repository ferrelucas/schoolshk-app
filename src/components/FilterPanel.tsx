import React from 'react';
import type { School, SchoolFilters } from '../types/school';

interface FilterPanelProps {
  filters: SchoolFilters;
  onFiltersChange: (filters: SchoolFilters) => void;
  schools: School[];
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFiltersChange, schools }) => {
  const districts = [...new Set(schools.map(school => school.DISTRICT))].sort();
  const schoolLevels = [...new Set(schools.map(school => school['SCHOOL LEVEL']))].sort();
  const financeTypes = [...new Set(schools.map(school => school['FINANCE TYPE']))].sort();
  const sessions = [...new Set(schools.map(school => school.SESSION))].sort();
  const studentsGenders = [...new Set(schools.map(school => school['STUDENTS GENDER']))].sort();

  const handleFilterChange = (key: keyof SchoolFilters, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  return (
    <div className="filter-panel">
      <div className="filter-group">
        <label htmlFor="level">School Level:</label>
        <select 
          id="level"
          value={filters.level} 
          onChange={(e) => handleFilterChange('level', e.target.value)}
        >
          <option value="all">All Levels</option>
          {schoolLevels.map(level => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="category">Finance Type:</label>
        <select 
          id="category"
          value={filters.category} 
          onChange={(e) => handleFilterChange('category', e.target.value)}
        >
          <option value="all">All Types</option>
          {financeTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="district">District:</label>
        <select 
          id="district"
          value={filters.district} 
          onChange={(e) => handleFilterChange('district', e.target.value)}
        >
          <option value="all">All Districts</option>
          {districts.map(district => (
            <option key={district} value={district}>{district}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="session">Session:</label>
        <select 
          id="session"
          value={filters.session} 
          onChange={(e) => handleFilterChange('session', e.target.value)}
        >
          <option value="all">All Sessions</option>
          {sessions.map(session => (
            <option key={session} value={session}>{session}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="studentsGender">Students Gender:</label>
        <select 
          id="studentsGender"
          value={filters.studentsGender} 
          onChange={(e) => handleFilterChange('studentsGender', e.target.value)}
        >
          <option value="all">All Genders</option>
          {studentsGenders.map(gender => (
            <option key={gender} value={gender}>{gender}</option>
          ))}
        </select>
      </div>

      <button 
        className="reset-filters"
        onClick={() => onFiltersChange({ level: 'all', category: 'all', district: 'all', session: 'all', studentsGender: 'all' })}
      >
        Reset Filters
      </button>
    </div>
  );
};

export default FilterPanel;