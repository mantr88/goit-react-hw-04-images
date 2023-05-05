import { ThemeProvider } from "styled-components";
import { useState, useEffect } from "react";

import { Layout } from "./Layout/Layout";
import { GlobalStyle } from "./Utils/GlobalStyle";
import { theme } from "./Utils/Theme";
import { Searchbar } from "./Searchbar/Searchbar";
import { fetchGalery } from "services/api";
import { ImageGalery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Spiner } from "./Spiner/Spiner";

// export class App extends Component {
//   state = {
//     photos: null,
//     query: '',
//     page: 1,
//     isLoading: false,
//   };
  
//   async componentDidUpdate(_, prevState) {
//   if (prevState.page !== this.state.page) {
//     try {
//       this.setState({ isLoading: true });
//       const { query, page } = this.state;
//       const response = await fetchGalery(query, page);
//       let newPhotos = response.data.hits;
//       this.setState(prevState => {
//         this.state.photos = [...prevState.photos, ...newPhotos];
//       });
//     } catch (error) {
//       console.log(error);
//     } finally {
//       this.setState({ isLoading: false });
//     }
//   }
//   };

//   searchByrequest = async query => {
//     try {
//       this.setState({ isLoading: true });
//       const response = await fetchGalery(query);
//       this.setState({photos: response.data.hits, query: query});
//     } catch (error) {
//       console.log(error);
//     } finally {
//       this.setState({ isLoading: false });
//     }
//   };

//   loadsMore = () => {
//     this.setState(prevState => ({page: prevState.page + 1}));
// };

//   render() {
//     const { photos, isLoading } = this.state;
//     return (
//     <ThemeProvider theme={theme}>
//       <Layout>
//       <GlobalStyle />
//           <Searchbar query={this.searchByrequest} />
//           <Spiner visible={isLoading} />
//           {photos && <ImageGalery items={photos} />}
//           {photos && <Button loadsMore={this.loadsMore} />}
//       </Layout>
//     </ThemeProvider>
//   );
//   };
// };

export const App = () => {
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (query === '') return;
    // const controller = new AbortController();
    const fetchedImages = async () => {
      try {
        setIsLoading(true);
        const response = await fetchGalery(query, page);
        let newPhotos = response.data.hits;
        if (page === 1) {
          setPhotos([]);
        }
        setPhotos(pervState => [...pervState, ...newPhotos]);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchedImages();
    // return () => {
    //   controller.abort();
    // };
  }, [page, query]);

  // const onSubmit = value => {
  //   try {
  //     if (value === query) {
  //       return;
  //     }
  //     setQuery(value);
  //     setPage([]);
  //   } catch (err) {
  //     alert(err.message);
  //   }
  // };
  
  const loadsMore = () => {
    setPage(prevState => prevState + 1);
  }
  return (
    <ThemeProvider theme={theme}>
      <Layout>
      <GlobalStyle />
          <Searchbar query={setQuery} />
          <Spiner visible={isLoading} />
          {photos.length !== 0 && <ImageGalery items={photos} />}
          {photos.length !== 0 && <Button loadsMore={loadsMore} />}
      </Layout>
    </ThemeProvider>
  );
};
