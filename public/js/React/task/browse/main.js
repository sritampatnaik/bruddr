"use strict";
import React from 'react';
import ReactDOM from 'react-dom';
import Spinner from 'react-spinkit';

import {Underline} from './../../components/underline'
import {TaskList} from './../../components/TaskList'
import {Modal_TaskTake} from './../../components/Modal_TaskTake'

class MainPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      isReloading: false,
      hasReloadedBefore: false,
      tasks: [],
      
      selectedTab: 'Available',
      selectedTask: null,
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
    this.interval = setInterval(this.refreshTaskList.bind(this), 1500);
  }
  
  render() {
    return (
      <div style={{position:'relative'}}>
        {this.renderReloadingInfo()}
        {this.renderTabs()}
        {this.renderTaskList()}
        {this.renderPopup()}
      </div>
    )
  }
  
  renderReloadingInfo() {
    // Remove the line under if you want a front end for this
    return;
    if (this.state.isReloading) {
      return (
        <div className='row animated fadeInUp' style={styleSheet.reloadingDiv}>
          Reloading . .
        </div>
      )
    } 
    if (!this.state.isReloading && this.state.hasReloadedBefore) {
      return (
        <div className='row animated fadeOutUp' style={styleSheet.reloadingDiv}>
          Done!
        </div>
      )
    }
  }
  
  renderTabs() {
    return (
      <ul style={{paddingTop: '20px'}} className="nav nav-inline row">
        {this.state.tabs.map( (tab) => {
          return (
            <li className="nav-item col-xs-4" key={tab}>
              <a onClick={this.handleTabClicked.bind(this,tab)} className="nav-link" >{tab}</a>
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
          <div id='loadingDiv'>
            <h2  className='animated fadeInUp'>No Tasks to show!</h2>
          </div>
        )
      }
      
      return (
        <div className='animated slideInUp' style={{padding:'25px 0px'}}>
          <TaskList
            ref={'list'}
            handleCellClicked = {this.handleCellClicked.bind(this)}
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

  renderPopup() {
    return (
      <Modal_TaskTake 
        taskData = {this.state.selectedTask}
        refresh = {this.refreshTaskList.bind(this)}
        />
    )
  }
  
  handleCellClicked(_obj) {
    this.setState({
      selectedTask: _obj
    }, () => {
      $('#Modal_TaskTake').modal('show')
    })
  }

  handleTabClicked(tab) {
    this.setState({
      selectedTab: tab,
      loaded: false,
    }, () => {
      this.getTasks({
        status:this.state.tabs.indexOf(this.state.selectedTab)
      })
    })
  }
  
  refreshTaskList() {
    this.setState({
      isReloading: true,
      hasReloadedBefore: true,
    }, () => {
      setTimeout(()=> {
        this.getTasks({
          status:this.state.tabs.indexOf(this.state.selectedTab)
        })} , 0)
    })
  }
  
  /* API Calls */
  getTasks(query) {
    const _apiURL = '/api/v1/bruddrtask/getTasks'
    $.ajax({
      type: "GET",
      url: _apiURL,
      data: query,
      dataType: 'json',
      success: function(data) {
        // hacky fix to compare objects
        this.setState({
          loaded:true,
          isReloading: false,
          tasks: data,
        })
      }.bind(this),
      error: function(xhr, status, err) {
        console.log('error')
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

}

const styleSheet = {
  reloadingDiv : {
    position:'absolute',
    top: '0',
    left: '0',
    right: '0',
    color: '#f8f8f8',
    padding: '4px',
    textAlign:'center',
    backgroundColor: 'darkOrange',
    borderRadius: '0px 0px 3px 3px'
  }
}

ReactDOM.render(<MainPanel/>, taskContainer);
