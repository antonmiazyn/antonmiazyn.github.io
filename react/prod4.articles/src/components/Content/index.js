import React from 'react';
import Article from './Article';

function Content(props) {
  let articlesGenerate = new Array();
  articlesGenerate = props.articlesList.map(item => (
    <Article
      key = {item.id}
      title = {item.title}
      text = {item.text}
    />
    )
  );
  return (
    articlesGenerate
  );
}

export default Content;
