"use strict";
import React from 'react';
import ReactDOM from 'react-dom';
import Spinner from 'react-spinkit';

import {Underline} from './../../components/underline'
import {TaskList} from './../../components/TaskList'

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
  
  componentDidMount() {
    this.getTasks({
      status: 0
    })
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
        <div className='animated slideInUp' style={{padding:'25px 0px'}}>
          <TaskList
            tasks = {this.state.tasks}
            pageSize = {50}
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

  /* API Calls */
  getTasks(query) {
    const _apiURL = '/api/v1/bruddrtask/getAvailableTasks'
    $.ajax({
      type: "GET",
      url: _apiURL,
      data: query,
      dataType: 'json',
      success: function(data) {
        this.setState({
          tasks: data,
          loaded: true,
        })
      }.bind(this),
      error: function(xhr, status, err) {
        console.log('error')
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

}

ReactDOM.render(<MainPanel/>, taskContainer);
