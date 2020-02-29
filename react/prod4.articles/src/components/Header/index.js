import React from 'react';
import Logotype from './Logotype';
import './header.css';

function Header(props) {
  return(
    <header>
      <Logotype />
      <div className="header__linker">
        {props.showHidderButton}
        {props.showEditButton}
        {props.showActiveButton}
      </div>
    </header>
  );
}

export default Header;
