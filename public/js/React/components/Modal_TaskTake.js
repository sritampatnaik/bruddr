"use strict";
import React from 'react';
import ReactDOM from 'react-dom';
import TimeAgo from 'react-timeago';

export class Modal_TaskTake extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  
  render() {
    if (!this.props.taskData) return (<div></div>)
    
    const taskDetails = [
      ['Title', this.props.taskData.title],
      ['Description', this.props.taskData.description],
      ['Posted', <TimeAgo date={this.props.taskData.received_at} />],
      ['Limit', this.props.taskData.time_limit || '2 H'],
      ['Price', this.props.taskData.price],
      ['Location', this.props.taskData.location || '300m from you.'],
    ]
    
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
                  <table style={styleSheet.table}>
                    <tbody style={styleSheet.maxWidth}>
                      { 
                          taskDetails.map( (detail) => {
                            return (
                              <tr key={detail[0]} style={styleSheet.tr}>
                                <td style={styleSheet.leftTD}>{detail[0]}</td>
                                <td style={styleSheet.rightTD}>{detail[1]}</td>
                              </tr>
                            )
                          })
                      }                      
                    </tbody>
                  </table>
                </div>
              </div>
              
            </div>
            
            {this.renderActions()}
          </div>
        </div>
      </div>
    )
  }
  
  renderActions() {
    if (this.props.taskData.status == 0) {
      return (
        <div className="modal-footer">
          <div className="row">
            <div className="col-xs-5 col-xs-offset-1">
              <button style={styleSheet.maxWidth} data-dismiss="modal" className="btn btn-md btn-danger">Decline</button>
            </div>
            <div className="col-xs-5">
              <button style={styleSheet.maxWidth} data-dismiss="modal" className="btn btn-md btn-success" onClick={this.handleAccept.bind(this)}>Accept</button>
            </div>
          </div>
        </div>
      )
    } else if (this.props.taskData.status == 1) {
      return (
        <div className="modal-footer">
          <div className="row">
            <div className="col-xs-5 col-xs-offset-1">
              <button style={styleSheet.maxWidth} data-dismiss="modal" className="btn btn-md btn-danger">Cancel</button>
            </div>
            <div className="col-xs-5">
              <button style={styleSheet.maxWidth} data-dismiss="modal" className="btn btn-md btn-success" onClick={this.handleMarkComplete.bind(this)}>Mark as Complete</button>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="modal-footer">
          <div className="row">
            <div className="col-xs-8 col-xs-offset-2">
              <button style={styleSheet.maxWidth} data-dismiss="modal" className="btn btn-md btn-info">Close</button>
            </div>
          </div>
        </div>
      )
    }
  }
  
  handleMarkComplete() {
    const _apiURL = '/api/v1/bruddrtask/markAsComplete/' + this.props.taskData._id
    $.ajax({
      type: "GET",
      url: _apiURL,
      dataType: 'json',
      success: function(data) {
        this.props.refresh()
      }.bind(this),
      error: function(xhr, status, err) {
        alert('error:' + err)
      }.bind(this)
    });
  }
  
  handleAccept() {
    const _apiURL = '/api/v1/bruddrtask/takeTask/' + this.props.taskData._id
    $.ajax({
      type: "GET",
      url: _apiURL,
      dataType: 'json',
      success: function(data) {
        this.props.refresh()
      }.bind(this),
      error: function(xhr, status, err) {
        alert('error:' + err)
      }.bind(this)
    });
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
  },
  tr: {
    marginBottom: '7.5px',
  },
  table: {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: '15px'
  },
  leftTD: {
    fontWeight: '700',
    textAlign: 'left',
    width: '30%',
  },
  rightTD: {
    fontWeight: '300',
    textAlign: 'right',
    width: '70%',
  },
  maxWidth: {
    width: '100%',
  },
}
