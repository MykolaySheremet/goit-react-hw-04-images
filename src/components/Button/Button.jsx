import {Button} from './Button.styled'

export const ButtonMore = ({onClick }) => {
    return <Button 
                type='button'
                onClick={onClick}>
                Load More
           </Button>
}

