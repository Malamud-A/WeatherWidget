import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

const ModalWrapper = ({ Modal, className, caption, toggleModal, ...rest }) => (
    <div className={`modal ${className}`}>

      <div className="modal-inner">
        <div className="modal-header">
          <h3 className="modal-header__caption">{caption}</h3>
          <button onClick={toggleModal} className="modal-header__close-button"><FontAwesomeIcon icon={faTimesCircle}/></button>
        </div>
        <Modal {...rest} />
      </div>
    </div>
);

export default ModalWrapper;