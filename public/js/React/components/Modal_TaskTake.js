"use strict";
import React from 'react';
import ReactDOM from 'react-dom';


export class Modal_TaskTake extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  
  render() {
    if (!this.props.taskData) return <div></div>
    return (
      <div className="modal" id='Modal_TaskTake'>
        <div className="modal-dialog" style={styleSheet.modalDialog}>
          <div className="modal-content" style={styleSheet.modalContent}>
            
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            
            <div className="modal-body">
              <div style={styleSheet.topContainer}>
                <img 
                  src={this.props.taskData.owner_avatar || '/images/bg/bg01.jpg'} 
                  height='125px'
                  width='125px'
                  style={styleSheet.avatar}
                  />

                <h2><i style={styleSheet.childIcon} className='fa fa-child'></i>{this.props.taskData.owner_name || 'Taylor Swift'}</h2>
              </div>
              <hr/>
              
              <div className="row">
                <div className="col-sm-10 col-sm-offset-1">
                  {this.props.taskData.description}
                </div>
              </div>
              
            </div>
            
            <div className="modal-footer">
              <div className="row">
                <div className="col-sm-8 col-sm-offset-2">
                  <button className="btn btn-blue" onclick="location.href='/questions/newest';" >Onward to 50 questions!</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const styleSheet = {
  /* Modal styles */
  modalDialog: {
    margin: '2.5px auto'
  },
  modalContent: {
      width: '100%',
      transform: 'translate(0, 15%) !important',
      padding: '15px',
  },
  
  
  /* Modal interior styles */
  
  topContainer : {
    height: 'inherit',
    minHeight: 'inherit',
    display:'flex', 
    alignItems:'center', 
    justifyContent:'space-around',
    padding: '5px 15px'
  },
  avatar : {
    border:'thin solid rgba("0,0,0,0.75")',
    borderRadius:'50%',
    marginBottom: '15px',
  },
  childIcon: {
    marginRight: '10px',
    color: '#0267C1'
  }
}
