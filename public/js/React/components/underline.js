"use strict";
import React from 'react';
import ReactDOM from 'react-dom';
import ReactList from 'react-list';
import Spinner from 'react-spinkit';

export class Underline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: this.props.width || '100%',
      color: this.props.color || 'black',
      height: this.props.height || '1px',
    };
  }
  
  render() {
    return (
      <div style={{
          width:this.state.width,
          backgroundColor: this.state.color,
          height: this.state.height,
          margin: '0 auto',
        }}
        className={this.props.classes}
      >
      </div>
    )
  }
}
