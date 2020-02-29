import React from 'react';

function Article(props) {
  return(
    <div className="acticle__container">
      <h2>{props.title}</h2>
      <p>
        {props.text}
      </p>
    </div>
  );
}

export default Article;
