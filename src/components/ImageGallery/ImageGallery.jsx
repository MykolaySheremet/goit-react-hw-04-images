import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryBox } from './ImageGallery.styled';
import PropTypes from 'prop-types';


export const ImageGallery = ({ pictureSerch }) => {

    return (
            <ImageGalleryBox>
                {pictureSerch.hits.map(({ id, webformatURL, tags, largeImageURL }) => <ImageGalleryItem key={id} webformatURL={webformatURL} tags={tags} largeImageURL={largeImageURL} ></ImageGalleryItem>)}
            </ImageGalleryBox>

            )
        }


ImageGallery.propTypes = {
    pictureSerch: PropTypes.shape({
        hits: PropTypes.arrayOf(PropTypes.shape({
            id:PropTypes.number.isRequired,
            webformatURL: PropTypes.string.isRequired,
            tags: PropTypes.string.isRequired,
            largeImageURL: PropTypes.string.isRequired,
        }))
    })
    
}        