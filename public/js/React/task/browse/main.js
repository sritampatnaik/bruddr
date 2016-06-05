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
      selectedTab: 'All',
      tabs : [
        'All',
        'Quick & Easy',
        'Premium'
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
            <li className="nav-item col-xs-4" key={tab}>
              <a onClick={()=>{this.setState({selectedTab:tab})}} className="nav-link" >{tab}</a>
              {(this.state.selectedTab == tab) ? <Underline color='#001F54' height='5px' width='80%' classes='animated fadeInUp' /> : null }
            </li>
          )
        })}
      </ul>
    )
  }
}

ReactDOM.render(<MainPanel/>, taskContainer);
