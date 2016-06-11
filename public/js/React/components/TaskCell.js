"use strict";
import React from 'react';
import ReactDOM from 'react-dom';
import ReactList from 'react-list';
import Spinner from 'react-spinkit';

export class TaskCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: this.props.width || '100%',
      color: this.props.color || 'rgba(255,255,255,0.5)',
      height: this.props.height || '50px',
    };
  }
  
  render() {
    return (
      <div style={{
          width:this.state.width,
          backgroundColor: this.state.color,
          height: this.state.height,
          margin: '0 auto',
          border: 'thin solid black'
        }}
        className={this.props.classes}
      >
      {this.props.taskData.title}
      </div>
    )
  }
}
