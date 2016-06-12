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
      minHeight: this.props.minimumHeight || '',
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
          minHeight: this.state.minHeight,
          height: this.state.height,
          margin: this.state.margin,
          padding: this.state.padding,
          borderLeft: 'thick solid #0267C1'
        }}
        className='row'
        onMouseOver={()=>{this.setState({boxShadow:'none'})}}
        onMouseOut={()=>{this.setState({boxShadow:styleSheet.boxShadow})}}
        onClick={() => {
          this.props.handleCellClicked(this.props.taskData)
        }}
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
            <span style={{color:'rgba(0,0,0,0.6)'}}><TimeAgo date={this.props.taskData.received_at} /></span>
          </div>
        </div>
        
        <div className='col-md-9' style={{padding:'25px'}}>
          <h2>{this.props.taskData.title}</h2>
          <hr/>
          
          <div className='row'>
            <div className='col-xs-8' style={{borderRight: 'thin solid rgba(0,0,0,0.25)'}}>
              <h5>Description</h5>
              <p style={{color:'rgba(0,0,0,0.6)'}}>{this.props.taskData.description}</p>
            </div>
            <div className='col-xs-4'>
              <h5>Price</h5>
              <span>
                <i className='fa fa-dollar' style={{display:'inline',color: 'green', marginRight:'10px'}}></i>
                <h2 style={{display:'inline'}}>{this.props.taskData.price}</h2>  
              </span>
            </div>
          </div>
          
          <div style={{marginTop: '25px'}} className='row'>
            <div className='col-xs-8'>
              <i className='fa fa-2x fa-map-marker' style={{color: 'darkorange', marginRight:'10px'}}></i>
              {this.props.taskData.location || '300m from you.'}
            </div>
            <div className='col-xs-4'>
              <i className='fa fa-2x fa-clock-o' style={{color: '#0267C1', marginRight:'10px'}}></i>
              <span style={{whiteSpace: 'nowrap'}}>
                {this.props.taskData.time_limit || '2 H'}
              </span>
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
    minHeight: 'inherit',
    display:'flex', 
    flexDirection:'column', 
    alignItems:'center', 
    justifyContent:'center',
  },
  leftContainerAvatar : {
    border:'thin solid rgba("0,0,0,0.75")',
    borderRadius:'50%',
    marginBottom: '15px',
  }
}
