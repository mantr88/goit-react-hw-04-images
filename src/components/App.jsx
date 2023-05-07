import { ThemeProvider } from 'styled-components';
import { useState, useEffect } from 'react';

import { Layout } from './Layout/Layout';
import { GlobalStyle } from './Utils/GlobalStyle';
import { theme } from './Utils/Theme';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchGalery } from 'services/api';
import { ImageGalery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Spiner } from './Spiner/Spiner';

export const App = () => {
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (query === '') {
      return;
    }
    const fetchImages = async () => {
      try {
        setIsLoading(true);
        const response = await fetchGalery(query, page);
        let newPhotos = response.data.hits;
        if (page === 1) {
          setPhotos([]);
        }
        setPhotos(prevState => [...prevState, ...newPhotos]);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, [page, query]);

  const loadsMore = () => {
    setPage(prevState => prevState + 1);
  };

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
