import React from 'react';

function ShowMoreButton(props) {
  return(
    <button className="more__button" onClick={props.itteratorUp}>
      Show More
    </button>
  )
}

export default ShowMoreButton;
