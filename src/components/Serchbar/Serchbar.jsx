import { useState } from "react";
import { toast } from 'react-toastify';
import { SerchFormBox, Header, SearchFormButton,SearchFormInput } from './Serchbar.styled';
import { MdOutlineFindInPage } from "react-icons/md";
import PropTypes from 'prop-types';

export const Serchbar = ({propSubmit}) => {
    const [searchPictures, setSearchPictures] = useState('');

    const handleInputChange = (e) => {

        setSearchPictures(e.currentTarget.value.toLowerCase());
    }

    const handleNameChange = (e) => {
        e.preventDefault();
        
        if (searchPictures.trim() === '') {
            return toast.error("Please input some name pictures to find ");
        }
        propSubmit(searchPictures);
    }

        return (
            <Header>
                <SerchFormBox
                    onSubmit={handleNameChange}>
                        <SearchFormButton type="submit">
                            <MdOutlineFindInPage size={40} />
                        </SearchFormButton>

                        <SearchFormInput onChange={handleInputChange}
                            type="text"
                            value={searchPictures}
                            autoComplete="off"
                            autoFocus
                            placeholder="Search images and photos"
                    />
                </SerchFormBox>
            </Header>
            
        )
    }


// export class Serchbar extends Component {
//     // state={
//     //     searchPictures: '',
//     // }

//     // handleNameChange = (e) => {
//     //     e.preventDefault();
        
//     //     if (this.state.searchPictures.trim() === '') {
//     //         return toast.error("Please input some name pictures to find ");
//     //     }
        
//     //     this.props.propSubmit(this.state.searchPictures);
//     //     // this.setState({ searchPictures: '' });
//     // }


//     // handleInputChange = (e) => {

//     //     this.setState({ searchPictures: e.currentTarget.value.toLowerCase()})
//     // }


//     // render() {
//     //     return (
//     //         <Header>
//     //             <SerchFormBox
//     //                 onSubmit={this.handleNameChange}>
//     //                     <SearchFormButton type="submit">
//     //                         <MdOutlineFindInPage size={40} />
//     //                     </SearchFormButton>

//     //                     <SearchFormInput onChange={this.handleInputChange}
//     //                         type="text"
//     //                         value={this.state.searchPictures}
//     //                         autoComplete="off"
//     //                         autoFocus
//     //                         placeholder="Search images and photos"
//     //                 />
//     //             </SerchFormBox>
//     //         </Header>
            
//     //     )
//     // }
// }

Serchbar.propTypes = {
    propSubmit: PropTypes.func.isRequired,
}