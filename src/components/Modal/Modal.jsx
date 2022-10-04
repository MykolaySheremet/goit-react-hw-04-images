import { createPortal } from 'react-dom';
import { BakcDrop, ModalWindow } from './Modal.styled';
import PropTypes from 'prop-types';
import { useEffect } from 'react';


const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onClose, children }) => {
    useEffect(() => {
        const handlecloseEscape = (e) => {

            if (e.code === 'Escape') {
                onClose();
            }
        }

        window.addEventListener('keydown', handlecloseEscape)
    
        return (() => { window.removeEventListener('keydown', handlecloseEscape) })
    
    },[onClose])




    const closeModal = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
  }



    return createPortal(
            <BakcDrop onClick={closeModal}>
                <ModalWindow> 
                    {children}
                </ModalWindow>
            </BakcDrop>,
            
            modalRoot)
    
}

// export class Modal extends Component {

    

//     componentDidMount() {
//         // console.log('did mount')
//         window.addEventListener('keydown', this.handlecloseEscape)
//     }

//     componentWillUnmount() {
//         window.removeEventListener('keydown', this.handlecloseEscape)
//      }

//     handlecloseEscape = (e) => {
//         // console.log('Esc')
//         if (e.code === 'Escape') {
//             this.props.onClose();
//         }
//     }

//     closeModal = (e) => {
//         if (e.target === e.currentTarget) {
//             this.props.onClose();
//         }
//   }


    // render() {
    //     return createPortal(
    //         <BakcDrop onClick={this.closeModal}>
    //             <ModalWindow> 
    //                 {this.props.children}
    //             </ModalWindow>
    //         </BakcDrop>,
            
    //         modalRoot)
    // }
        
    
// }

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
}