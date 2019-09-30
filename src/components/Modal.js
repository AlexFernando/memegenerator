import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const Modal = ({ isShowing, hide, elem, newWidth, newHeight}) => isShowing ? ReactDOM.createPortal(

  
  <React.Fragment>
    <div className="modal-overlay"/>
    <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
      <div className="modal">
        <div className="modal-header">
          <h5 class="modal-title">others</h5>
          <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div class="modal-body">
        <svg
              width={newWidth}
              height={newHeight}
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink">
              <image
                xlinkHref={elem}
                height={newHeight}                
                width={newWidth}
              />
            </svg>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-primary">Do Something</button> 
          <button type="button" class="btn btn-secondary">Cancel</button>
        </div>
        
        
      </div>
    </div>
  </React.Fragment>, document.body
) : null;

export default Modal;