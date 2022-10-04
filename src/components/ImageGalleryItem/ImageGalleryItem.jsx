import { Component } from "react";
import { ImageGalleryItems, ImageGalleryItemImage } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {

    state = {
        modalIsOpen: false,
    };

    togglModal = () => {
        // console.log('визиваюсь')
        this.setState(prevState => ({
            modalIsOpen: !prevState.modalIsOpen
        }))
        // console.log(this.state.modalIsOpen);
    }    

    render() {
        
        const {webformatURL, tags, largeImageURL} = this.props
        //   console.log(this.state.modalIsOpen)
        return (
           <> 
                <ImageGalleryItems>
                <ImageGalleryItemImage
                    src={webformatURL}
                    alt={tags}
                width="240"  onClick={this.togglModal}/>
                </ImageGalleryItems>
                {this.state.modalIsOpen &&
                    <Modal onClose={this.togglModal}>
                        <img
                            src={largeImageURL}
                            alt={tags}
                        ></img>
                    </Modal>}
            </>
    
        )
        
    }

}
    

ImageGalleryItem.propTypes = {
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL:PropTypes.string.isRequired
}

