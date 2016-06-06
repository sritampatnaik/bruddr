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
      loaded: false,
      tasks: [],
      
      selectedTab: 'Available',
      tabs : [
        'Available',
        'Pending',
        'Completed'
      ]
    };
  }
  
  render() {
    return (
      <div>
        {this.renderTabs()}
        {this.renderTaskList()}
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

  renderTaskList() {
    if (this.state.loaded) {
      if (this.state.tasks.length == 0) {
        return (
          <div className='animated bounceInDown'>
            <h2 className='animated swing'>No Tasks to show!</h2>
          </div>
        )
      }
      
      return (
        <div className='animated slideInDown'>
          <ReactList
              ref={'list'}
              itemRenderer={this.renderCell.bind(this)}
              length={this.props.tasks.length}
              pageSize={50}
              type='simple'
            />
        </div>
      )
    } else {
      return (
        <div id='loadingDiv'>
          <Spinner spinnerName='three-bounce' noFadeIn />
        </div>
      )
    }
  }
  
  renderCell(index, key) {
  return (
    <div 
      isSelected={this.props.selectedIdx == index}
      key={key}
      index={index}
      didSelectQuestionFromLeftPanel={this.props.didSelectQuestionFromLeftPanel.bind(this)}
      questionData={this.props.questions[index]}
    ></div>
  )
}
}

ReactDOM.render(<MainPanel/>, taskContainer);
