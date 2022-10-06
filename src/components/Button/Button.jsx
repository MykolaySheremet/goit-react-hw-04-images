import { Button } from './Button.styled'
import PropTypes from 'prop-types';

export const ButtonMore = ({ onClick }) => {
    // console.log(onClick)
    return <Button 
                type='button'
                onClick={onClick}>
                Load More
           </Button>
}




Button.propTypes = {
    onClick: PropTypes.func.isRequired,
}

