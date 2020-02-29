import React from 'react';
import Header from './components/Header';
import Content from './components/Content';
import Editor from './components/Editor';
import ShowMoreButton from './components/Content/ShowMoreButton';
import list from './components/Content/list.js';
import './components/Content/content.css';

  /*=================================================*/

class App extends React.Component {
  constructor(props) {
    super(props);

    this.listC = new Array();
    this.listC = list.slice();
    this.c = list.length - 1;

    this.state = {
      articlesToShow: [],
      articlesHidden: false,
      showButton: 'Show Articles',
      hidePanelButton: 'Hide Panel',
      moreButton: false,
      articlesCounter: this.listC.length -= 1,
      itterator: 4,
      editorVisible: true,
      showActive: false,
      articlesHidderButton: true,
      userTitle: '',
      userText: ''
    }

    this.handleShowList = this.handleShowList.bind(this);
    this.elementsCounterAdd = this.elementsCounterAdd.bind(this);
    this.addElement = this.addElement.bind(this);
    this.editPanelOPening = this.editPanelOPening.bind(this);
    this.setTitle = this.setTitle.bind(this);
    this.setText = this.setText.bind(this);
    this.clearFields = this.clearFields.bind(this);
    this.deleteArticles = this.deleteArticles.bind(this);

    this.shortList = new Array();

    this.elementsCounter = this.state.itterator;
  }

  /*=================================================*/

  editPanelOPening() {
    this.setState({
      articlesToShow: [],
      moreButton: false,
      showButton: 'Show Articles',
      showActive: !this.state.showActive,
      editorVisible: !this.state.editorVisible,
    })
    if(!this.state.editorVisible) {
      this.setState({
        hidePanelButton: 'Hide Panel'
      })
    } else {
      this.setState({
        hidePanelButton: 'Edit Panel'
      })
    }
  }

  /*=================================================*/

  setTitle(event) {
    this.setState({
      userTitle: event.target.value
    })
  }

  /*=================================================*/

  setText(event) {
    this.setState({
      userText: event.target.value
    })
  }

  /*=================================================*/

  addElement() {
    this.listC.push({
      id: this.c,
      title: this.state.userTitle,
      text: this.state.userText
    })
    this.c += 1;

    this.setState({
      articlesCounter: this.state.articlesCounter += 1
    })
  }

  /*=================================================*/

  elementsCounterAdd() {
    this.setState({
      itterator: this.state.itterator += 4
    })
    this.elementsCounter = this.state.itterator;

    if(this.state.articlesCounter > this.elementsCounter) {
      this.setState({
        articlesToShow: this.shortList,
      })
    } else {
      this.setState({
        articlesToShow: this.listC,
      })
    }
    for(let i = 0; i < this.elementsCounter; i++) {
      this.shortList[i] = this.listC[i];
    }
  }

  /*=================================================*/

  handleShowList() {
    this.setState({
      articlesHidden: !this.state.articlesHidden,
    })
    if(!this.state.articlesHidden) {
      if(this.state.articlesCounter > this.elementsCounter) {
        this.setState({
          articlesToShow: this.shortList,
          showButton: 'Hide Articles'
        })
      } else {
        this.setState({
          articlesToShow: this.listC,
          showButton: 'Hide Articles'
        })
      }
    } else {
      this.setState({
        articlesToShow: [],
        showButton: 'Show Articles'
      })
    }
    for(let i = 0; i < this.elementsCounter; i++) {
      this.shortList[i] = this.listC[i];
    }
    if(this.state.articlesCounter > 0) {
      this.setState({
        moreButton: !this.state.moreButton
      })
    } else {
      this.setState({
        moreButton: false
      })
    }
  }

  /*=================================================*/

  clearFields() {
    this.setState({
      userTitle: '',
      userText: ''
    })
  }

  /*=================================================*/

  deleteArticles() {
    this.setState({
      articlesToShow: [],
      articlesCounter: 0,
      moreButton: false
    })
    for(let i = 0; i < this.listC.length; i++) {
      this.listC.splice(i);
    }
  }

  /*=================================================*/

  render() {
    if(!(this.listC.length - this.shortList.length < 1) && this.state.moreButton) {
        this.moreButtonRender = <ShowMoreButton itteratorUp={this.elementsCounterAdd} />
    } else {
      this.moreButtonRender = ''
    }
    console.log(this.listC.length);

    if(this.state.editorVisible) {
      this.editorRender = <Editor
        addingElement={this.addElement}
        clearingFields={this.clearFields}
        addedArticlesCounter={this.state.articlesCounter}
        settingTitle={this.setTitle}
        settingText={this.setText}
        titleEmpty={this.state.userTitle}
        textEmpty={this.state.userText}
      />
    } else {
      this.editorRender = ''
    }

    if(this.state.showActive) {
      this.activeButtonRender = <a onClick={this.handleShowList}>{this.state.showButton}</a>
    } else {
      this.activeButtonRender = <a className="unactive">{this.state.showButton}</a>
    }

    if(!this.state.articlesHidden) {
      this.activeEditRender = <a onClick={this.editPanelOPening}>{this.state.hidePanelButton}</a>
    } else {
      this.activeEditRender = <a className="unactive">Edit Panel</a>
    }

    if(this.state.articlesHidden) {
      this.edditorButtonRender = <a onClick={this.deleteArticles}>Clear Articles</a>
    } else {
      this.edditorButtonRender = <a className="unactive">Clear Articles</a>
    }

    return(
      <div className="container">
        <Header
          showActiveButton={this.activeButtonRender}
          showEditButton={this.activeEditRender}
          showHidderButton={this.edditorButtonRender}
        />
        <div className="content">
          <Content
            articlesList={this.state.articlesToShow}
          />
          {this.moreButtonRender}
          {this.editorRender}
        </div>
      </div>
    );
  }
}

  /*=================================================*/

export default App;
