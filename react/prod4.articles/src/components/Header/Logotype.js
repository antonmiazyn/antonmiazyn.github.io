import React from 'react';
import './header.css';

function Logotype(props) {
  let siteName = ['Articles', '.REACT'];

  return(
      <div className="header__logotype">
        <h2>
          <a href="/">{siteName[0]}<span>{siteName[1]}</span></a>
        </h2>
      </div>
  );
}

export default Logotype;
