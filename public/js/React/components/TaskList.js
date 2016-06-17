"use strict";
import React from 'react';
import ReactDOM from 'react-dom';
import ReactList from 'react-list';

import {TaskCell} from './TaskCell'

export class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  
  render() {
    return (
      <ReactList
          ref={'list'}
          itemRenderer={this.renderCell.bind(this)}
          length={this.props.tasks.length}
          pageSize={this.props.pageSize || 20}
          type={this.props.type || 'simple' }
        />
    )
  }
  
  renderCell(index, key) {
    return (
      <TaskCell
        key={key}
        index={index}
        taskData={this.props.tasks[index]}
        handleCellClicked = {this.props.handleCellClicked.bind(this)}
        
        padding= '10px 0px'
        margin= '20px 5%'
        width= '90%'
        minimumHeight= '200px'
      />
    )
  }
}
