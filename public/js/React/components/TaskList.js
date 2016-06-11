"use strict";
import React from 'react';
import ReactDOM from 'react-dom';
import ReactList from 'react-list';

import {TaskCell} from './TaskCell'

export class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks : this.props.tasks
    };
  }
  
  render() {
    return (
      <ReactList
          ref={'list'}
          itemRenderer={this.renderCell.bind(this)}
          length={this.state.tasks.length}
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
        taskData={this.state.tasks[index]}
      />
    )
  }
}
