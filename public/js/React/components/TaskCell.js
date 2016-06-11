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
      height: this.props.height || 'inherit',
      minHeight: this.props.height || 'inherit',
      margin: this.props.margin || '0 auto',
      padding: this.props.padding || '0px',
      boxShadow: styleSheet.boxShadow,
    };
  }
  
  render() {
    return (
      <div 
        style={{
          boxShadow: this.state.boxShadow, 
          transition: 'box-shadow 0.15s ease-in, border 0.15s ease-in',
          width:this.state.width,
          backgroundColor: this.state.color,
          height: this.state.height,
          minHeight: this.state.minHeight,
          margin: this.state.margin,
          padding: this.state.padding,
        }}
        className='row'
        onMouseOver={()=>{this.setState({boxShadow:'none'})}}
        onMouseOut={()=>{this.setState({boxShadow:styleSheet.boxShadow})}}
      >
      
        <div className='col-md-3' style={styleSheet.leftContainer}>
          <img 
            src={this.props.taskData.owner_avatar || '/images/bg/bg01.jpg'} 
            height='100px'
            width='100px'
            style={styleSheet.leftContainerAvatar}
            />
          <div style={{textAlign:'center'}}>
            <h3>{this.props.taskData.owner_name || 'Taylor Swift'}</h3>
            <p style={{color:'rgba(0,0,0,0.6)'}}><TimeAgo date={this.props.taskData.received_at} /></p>
          </div>
        </div>
        
        <div className='col-md-9' style={{padding:'5px'}}>
          <h2>{this.props.taskData.title}</h2>
          <hr/>
          
          <div className='row'>
            <div className='col-xs-8' style={{borderRight: 'thin solid rgba(0,0,0,0.25)'}}>
              <h5>Description</h5>
              <p>{this.props.taskData.description}</p>
            </div>
            <div className='col-xs-4'>
              <h5>Price</h5>
              <p>{this.props.taskData.price}</p>
            </div>
          </div>
          
          <div className='row'>
            <div className='col-xs-8'>
              Location..
            </div>
            <div className='col-xs-4'>
              Deliver in..
            </div>
          </div>
          
        </div>
      </div>
    )
  }
}

const styleSheet = {
  boxShadow:'0px 25px 55px 0px rgba(0,0,0,0.19), 0px 16px 28px 0px rgba(0,0,0,0.24)',
  
  leftContainer : {
    height: 'inherit',
    display:'flex', 
    flexDirection:'column', 
    alignItems:'center', 
    justifyContent:'space-around',
  },
  leftContainerAvatar : {
    border:'thin solid rgba("0,0,0,0.75")',
    borderRadius:'50%'
  }
}
