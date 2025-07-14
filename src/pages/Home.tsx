import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="home">
      <h1>Hong Kong Schools</h1>
      <Link to="/schools" className="btn-primary">View Schools</Link>
    </div>
  );
};

export default Home;