import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="ui secondary pointing menu">
      <Link to="/" className="item">
        Favorite Things App
      </Link>
      <div className="right menu">
        <Link to="/" className="item">
          All Favorite Things
        </Link>
        <Link to="/audit-log" className="item">
          Audit log
        </Link>
      </div>
    </div>
  );
};

export default Header;
