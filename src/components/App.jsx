import { Serchbar } from "./Serchbar/Serchbar";
import { ToastContainer,toast} from 'react-toastify';
import { ImageGallery } from './ImageGallery/ImageGallery';
import 'react-toastify/dist/ReactToastify.css';
import { FechCSerchImages } from 'servises/serchimages-api';
import { Loader } from "./Loader/Loader";
import { ButtonMore } from './Button/Button';
import { Title } from './Serchbar/Serchbar.styled';
import { useState, useEffect } from "react";



export const App = () => {
  const [searchPictures, setSearchPictures] = useState('');
  const [page, setPage] = useState(1);
  // const [perPage, setPerPage] = useState(12);
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);
  // const [status, setStatus] = useState("idle");
  const [loadingmore, setLoadingmore] = useState(false);
  const [findPictures, setFindPictures] = useState([]);
  const perPage = 12;
                                                    

  const handleSerchImages = (searchInputPictures) => {
    // console.log('searchInputPictures', searchInputPictures);
    // console.log('searchPictures', searchPictures);

    if (searchPictures === searchInputPictures) {
      return toast.error("Enter new query for serch, this query you can seee now-))");
    }
    
    setSearchPictures(searchInputPictures);
    setPage(1);
    setLoader(false);
    setFindPictures([]);
  }

  useEffect(() => {

    if (searchPictures === '') {
      return;
    }
    setLoadingmore(false)
    setLoader(true);
    setError(null);

      
    FechCSerchImages(searchPictures, page, perPage)
      .then(({ total, totalHits, hits }) => {       
          if (total === 0) {
            // setStatus("rejected");
            setLoader(false);
            setError(Error)
            
            return Promise.reject(new Error(`Sorry, but we can't find ${searchPictures}. Try again.`))
          }
          
          if (totalHits > perPage) {
            setLoadingmore(true);
          }
              
          if (page === Math.ceil(totalHits / perPage)) {
            setLoadingmore(false);
          }
        // console.log('data', { total, totalHits, hits });
       
        setFindPictures((prevImages)=>([...prevImages, ...hits]))
        setLoader(false);
        })
      .catch(error => {
        setError(error);
      })
  },[page, searchPictures, perPage])

   




  const loadMore = () => {
    setPage(prevPage => prevPage + 1)
    
    // this.setState(prevState => ({ page: prevState.page + 1 }))
  }

  // console.log('findPictures',findPictures);



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
      <Serchbar propSubmit={handleSerchImages} />
      <ToastContainer autoClose={1500} />
      <ImageGallery pictureSerch={findPictures}></ImageGallery >
      {loadingmore && <ButtonMore onClick={loadMore}></ButtonMore>}
      {loader && <Loader></Loader>}
      {error && <Title > {error.message} </Title>}
      
    </div>
    );




  
}



// export class App extends Component {

//   // state = {
//   //   searchPictures: '',
//   //   page: 1,
//   //   perPage: 12,
//   //   error: null,
//   //   status: "idle",
//   //   loadingmore: false,
//   //   findPictures: {},
//   // }

//   // handleSerchImages = (searchPictures) => {

//   //   if (searchPictures === this.state.searchPictures) {
//   //     return toast.error("Enter new query for serch, this query you can seee now-))");
//   //   }

//   //   this.setState({
//   //     searchPictures,
//   //     page: 1,
//   //     loadingmore: false
//   //   });
//   // }


//   // componentDidUpdate(prevProps, prevState) {

//   //   if (prevState.searchPictures !== this.state.searchPictures ||
//   //     prevState.page !== this.state.page) {

//   //     this.setState({ status: "pending" });
            
//   //     const { searchPictures, page, perPage, } = this.state

//   //     FechCSerchImages(searchPictures, page, perPage)
//   //       .then(({ total, totalHits, hits }) => {
                    
//   //         if (total === 0) {
//   //           this.setState({ status: "rejected" })
//   //           return Promise.reject(new Error(`Sorry, but we can't find ${searchPictures}. Try again.`))
//   //         }
              
//   //         if (totalHits > perPage) {
//   //           this.setState({ loadingmore: true })
//   //         }
              
//   //         if (page === Math.ceil(totalHits / perPage)) {
//   //           this.setState({ loadingmore: false });
//   //         }
                
//   //         this.setState({ findPictures: { total, totalHits, hits }, status: "resolved" })
              
//   //       })
//   //       .catch(error => this.setState({ error, status: "rejected" }))

//   //   }
//   // }
  
//   // loadMore = () => {
//   //   this.setState(prevState => ({ page: prevState.page + 1 }))
//   // }

//   // render() {
//   //   // const { findPictures, status, error, loadingmore } = this.state;
    
//   //   // return (<div
//   //   //   style={{
//   //   //     justifyContent: 'center',
//   //   //     flexDirection: "column",
//   //   //     alignItems: 'center',
//   //   //     fontSize: 20,
//   //   //     color: '#010101',
//   //   //     paddingBottom: 24,
//   //   //     display: 'grid',
//   //   //     gridTemplateColumns: '1fr',
//   //   //     gridGap: '16px',

//   //   //   }}>
//   //   //   <Serchbar propSubmit={this.handleSerchImages} />
//   //   //   <ToastContainer autoClose={1500} />
//   //   //   {status === "pending" && <Loader></Loader>}
//   //   //   {status === "rejected" && <Title > {error.message} </Title>}
//   //   //   {status === "resolved" && <>
//   //   //     <ImageGallery pictureSerch={findPictures}></ImageGallery >
//   //   //     {loadingmore && <ButtonMore onClick={this.loadMore}></ButtonMore>}
//   //   //   </>}
//   //   // </div>
//   //   // );

//   // };
// }