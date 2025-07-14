import React from 'react';
import type { School } from '../types/school';

interface SchoolTableProps {
  schools: School[];
}

const SchoolTable: React.FC<SchoolTableProps> = ({ schools }) => {
  return (
    <div className="school-table-container">
      <table className="school-table">
        <thead>
          <tr>
            <th>School Name</th>
            <th>Level</th>
            <th>Finance Type</th>
            <th>District</th>
            <th>Session</th>
            <th>Students Gender</th>
            <th>Address</th>
            <th>Telephone</th>
            <th>Website</th>
          </tr>
        </thead>
        <tbody>
          {schools.map((school) => (
            <tr key={school['SCHOOL NO.']}>
              <td>{school['ENGLISH NAME']}</td>
              <td>{school['SCHOOL LEVEL']}</td>
              <td>{school['FINANCE TYPE']}</td>
              <td>{school.DISTRICT}</td>
              <td>{school.SESSION}</td>
              <td>{school['STUDENTS GENDER']}</td>
              <td>{school['ENGLISH ADDRESS']}</td>
              <td>{school.TELEPHONE}</td>
              <td>
                {school.WEBSITE && (
                  <a href={school.WEBSITE} target="_blank" rel="noopener noreferrer">
                    Visit
                  </a>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SchoolTable;