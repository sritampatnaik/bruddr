"use strict";
import React from 'react';
import ReactDOM from 'react-dom';
import ReactList from 'react-list';
import Spinner from 'react-spinkit';
import TimeAgo from 'react-timeago';

export class TaskCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: this.props.width || '100%',
      color: this.props.color || 'rgba(255,255,255,0.5)',
      height: this.props.height || '50px',
      margin: this.props.margin || '0 auto',
    };
  }
  
  render() {
    return (
      <div style={{
          width:this.state.width,
          backgroundColor: this.state.color,
          height: this.state.height,
          margin: this.state.margin,
          border: 'thin solid black'
        }}
      >
        <div className='col-md-3' style={styleSheet.leftContainer}>
          <img 
            src={'http://graph.facebook.com/'+ this.props.taskData.owner_id +'/picture?type=square'} 
            height='75px'
            style={styleSheet.leftContainerAvatar}
            />
          <div style={{textAlign:'center'}}>
            <h3>{this.props.taskData.owner_name || 'Taylor Swift'}</h3>
            <h5 style={{color:'rgba(0,0,0,0.6)'}}><TimeAgo date={this.props.taskData.received_at} /></h5>
          </div>
        </div>
        <div className='col-md-9'>
          
        </div>
      </div>
    )
  }
}

const styleSheet = {
  leftContainer : {
    height: 'inherit',
    display:'flex', 
    flexDirection:'column', 
    alignItems:'center', 
    justifyContent:'space-around'
  },
  leftContainerAvatar : {
    border:'thin solid rgba("0,0,0,0.75")',
    borderRadius:'50%'
  }
}
