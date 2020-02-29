import React from 'react';
import './editor.css';

function Editor(props) {
  return(
    <div className="editor__form">
      <h2>Add new article</h2>
      <fieldset>
        <input type="text" placeholder="Enter a title" onChange={props.settingTitle} value={props.titleEmpty}/>
        <textarea type="text" placeholder="Write the text" rows="10" onChange={props.settingText} value={props.textEmpty}></textarea>
      </fieldset>
      <div className="editor__counter">You just added: {props.addedArticlesCounter} articles</div>
      <button onClick={props.addingElement}>Create Article</button>
      <button className="clear_button" onClick={props.clearingFields}>Clear fields</button>
    </div>
  );
}

export default Editor;
