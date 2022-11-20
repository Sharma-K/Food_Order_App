import React, {Fragment} from "react";
import classes from './Modal.module.css';
import ReactDOM from 'react-dom';

const BackDrop = (props) => {

    return <div className={classes.backdrop} onClick={props.onHideCart}></div>
}

const ModalOverlays = (props) => {

    return <div className={classes.modal}>
        <div className={classes.context}>
            {props.children}
        </div>
    </div>

}

const portalElement = document.getElementById('overlays')

const Modal = (props) => {

    return <Fragment>
       {ReactDOM.createPortal(<BackDrop onHideCart={props.onHideCart} />, portalElement)}
       {ReactDOM.createPortal(<ModalOverlays>{props.children}</ModalOverlays>,
       portalElement
       )}
    </Fragment>
      

};

export default Modal;