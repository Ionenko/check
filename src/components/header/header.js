import React from 'react';
import { Link } from 'react-router-dom';
import block from 'bem-cn-lite';
import PropTypes from 'prop-types';
import logo from '../../img/logo.svg';

const c = block('content');

const Header = ({ children }) => (
  <div className={c('head')}>
    <div className="logo">
      <Link to="/">
        <img src={logo} alt="Connection" />
      </Link>
    </div>
    {children}
  </div>
);

Header.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Header;
