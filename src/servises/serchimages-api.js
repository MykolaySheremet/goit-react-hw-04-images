const KEY = '29210178-99963cb2fa4a70f711806a762';

function FechCSerchImages(searchPictures, page, perPage) {
    
    return (fetch(`https://pixabay.com/api/?key=${KEY}&q=${searchPictures}&image_type=photo&orientation=horizontal&page=${page}&per_page=${perPage}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }

            return Promise.reject(
                new Error(`Sorry, but we can't find ${this.props.searchPictures}. Try more`)
            );
        }))
};


export { FechCSerchImages };