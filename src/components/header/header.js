import React from "react";
import {Link} from "react-router-dom";
import block from "bem-cn-lite";
import logo from "../../img/logo.svg";

const c = block('content');

const Header = (props) => {
  return (
    <div className={c('head')}>
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Connection"/>
        </Link>
      </div>
      {props.children}
    </div>
  )
};

export default Header;