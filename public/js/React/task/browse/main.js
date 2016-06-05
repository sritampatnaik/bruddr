"use strict";
import React from 'react';
import ReactDOM from 'react-dom';
import ReactList from 'react-list';
import Spinner from 'react-spinkit';

class MainPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 0
    };
  }
  
  render() {
    return (
      <div>
        {this.renderTabs()}
      </div>
    )
  }
  
  renderTabs() {
    return (
      <ul className="nav nav-inline">
        <li className="nav-item">
          <a className="nav-link" href="#">Link</a>
          {(this.state.selectedTab == 0) ? <div>Hey</div> : null }
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Quick & Easy</a>
          {(this.state.selectedTab == 1) ? <div>Hey</div> : null }
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Premium</a>
          {(this.state.selectedTab == 2) ? <div>Hey</div> : null }
        </li>
      </ul>
    )
  }
}

ReactDOM.render(<MainPanel/>, taskContainer);
