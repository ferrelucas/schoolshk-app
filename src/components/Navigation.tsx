import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="navigation">
      <div className="nav-brand">
        <Link to="/">HK Schools</Link>
      </div>
      
      <ul className="nav-links">
        <li>
          <Link 
            to="/" 
            className={location.pathname === '/' ? 'active' : ''}
          >
            Home
          </Link>
        </li>
        <li>
          <Link 
            to="/schools" 
            className={location.pathname === '/schools' ? 'active' : ''}
          >
            Schools
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;