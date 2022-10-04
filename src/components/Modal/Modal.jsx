import { Component } from 'react';
import { createPortal } from 'react-dom';
import { BakcDrop, ModalWindow } from './Modal.styled';
import PropTypes from 'prop-types';


const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {

    componentDidMount() {
        // console.log('did mount')
        window.addEventListener('keydown', this.handlecloseEscape)
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handlecloseEscape)
     }

    handlecloseEscape = (e) => {
        // console.log('Esc')
        if (e.code === 'Escape') {
            this.props.onClose();
        }
    }

    closeModal = (e) => {
        if (e.target === e.currentTarget) {
            this.props.onClose();
        }
  }


    render() {
        return createPortal(
            <BakcDrop onClick={this.closeModal}>
                <ModalWindow> 
                    {this.props.children}
                </ModalWindow>
            </BakcDrop>,
            
            modalRoot)
    }
        
    
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
}