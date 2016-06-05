"use strict";
import React from 'react';
import ReactDOM from 'react-dom';
import ReactList from 'react-list';
import Spinner from 'react-spinkit';

import {Underline} from './../../components/underline'

class MainPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 0,
      tabs : [
        [0, 'All'],
        [1, 'Quick & Easy'],
        [2, 'Premium']
      ]
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
      <ul className="nav nav-inline row">
        {this.state.tabs.map( (tab) => {
          return (
            <li className="nav-item col-xs-4">
              <a className="nav-link" >{tab[1]}</a>
              {(this.state.selectedTab == tab[0]) ? <Underline color='#001F54' height='5px' width='80%' classes='animated fadeInUp' /> : null }
            </li>
          )
        })}
      </ul>
    )
  }
}

ReactDOM.render(<MainPanel/>, taskContainer);
