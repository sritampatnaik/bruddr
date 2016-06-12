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
    return (
      <div className="modal" id='Modal_TaskTake'>
        <div className="modal-dialog">
          <div className="modal-content">
            
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            
            <div className="modal-body">
              <div className='row'>
                blah blah blah blah
              </div>
              <hr/>
              <div className="row">
                <div className="col-sm-10 col-sm-offset-1">
                  blah blah details blah blah
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
