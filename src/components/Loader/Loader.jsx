import { ThreeCircles } from 'react-loader-spinner'
import {Box,Text} from './Loader.styled';

export const Loader = () => {
    return (<> 
        <Box>
            <ThreeCircles
            height="50"
            width="50"
            color="red"
            wrapperStyle={{}}
            wrapperClass=" text-aligt"
            visible={true}
            ariaLabel="three-circles-rotating"
            outerCircleColor=""
            innerCircleColor=""
            middleCircleColor=""
            />
            <Text>Loading...</Text>
            </Box>
        </>

)
}