"use strict";
import React from 'react';
import ReactDOM from 'react-dom';

class MainPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  
  render() {
    return (
      <div>
        Hello there
      </div>
    )
  }
}

ReactDOM.render(<MainPanel/>, taskContainer);
