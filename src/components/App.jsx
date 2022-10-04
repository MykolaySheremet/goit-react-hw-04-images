import { Component } from "react";
import { Serchbar } from "./Serchbar/Serchbar";
import { ToastContainer,toast} from 'react-toastify';
import { ImageGallery } from './ImageGallery/ImageGallery';
import 'react-toastify/dist/ReactToastify.css';
import { FechCSerchImages } from 'servises/serchimages-api';
import { Loader } from "./Loader/Loader";
import { ButtonMore } from './Button/Button';
import { Title } from './Serchbar/Serchbar.styled';




export class App extends Component {

  state = {
    searchPictures: '',
    page: 1,
    perPage: 12,
    error: null,
    status: "idle",
    loadingmore: false,
    findPictures: {},
  }

  handleSerchImages = (searchPictures) => {

    if (searchPictures === this.state.searchPictures) {
      return toast.error("Enter new query for serch, this query you can seee now-))");
    }

    this.setState({
      searchPictures,
      page: 1,
      loadingmore: false
    });
  }


  componentDidUpdate(prevProps, prevState) {

    if (prevState.searchPictures !== this.state.searchPictures ||
      prevState.page !== this.state.page) {

      this.setState({ status: "pending" });
            
      const { searchPictures, page, perPage, } = this.state

      FechCSerchImages(searchPictures, page, perPage)
        .then(({ total, totalHits, hits }) => {
                    
          if (total === 0) {
            this.setState({ status: "rejected" })
            return Promise.reject(new Error(`Sorry, but we can't find ${searchPictures}. Try again.`))
          }
              
          if (totalHits > perPage) {
            this.setState({ loadingmore: true })
          }
              
          if (page === Math.ceil(totalHits / perPage)) {
            this.setState({ loadingmore: false });
          }
                
          this.setState({ findPictures: { total, totalHits, hits }, status: "resolved" })
              
        })
        .catch(error => this.setState({ error, status: "rejected" }))

    }
  }
  
  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }))
  }

  render() {
    const { findPictures, status, error, loadingmore } = this.state;
    
    return (<div
      style={{
        justifyContent: 'center',
        flexDirection: "column",
        alignItems: 'center',
        fontSize: 20,
        color: '#010101',
        paddingBottom: 24,
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: '16px',

      }}>
      <Serchbar propSubmit={this.handleSerchImages} />
      <ToastContainer autoClose={1500} />
      {status === "pending" && <Loader></Loader>}
      {status === "rejected" && <Title > {error.message} </Title>}
      {status === "resolved" && <>
        <ImageGallery pictureSerch={findPictures}></ImageGallery >
        {loadingmore && <ButtonMore onClick={this.loadMore}></ButtonMore>}
      </>}
    </div>
    );

  };
}