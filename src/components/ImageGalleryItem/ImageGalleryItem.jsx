import { useState } from 'react';
import PropTypes from 'prop-types';
import { Item } from './ImageGalleryItem.styled';
import { ImageModal } from 'components/Modal/Modal';

export const ImageGalleryItem = ({
  item: { webformatURL, tags, largeImageURL },
}) => {
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <Item>
      <img
        src={webformatURL}
        alt={tags}
        onClick={() => setSelectedImg(largeImageURL)}
      />
      <ImageModal
        isOpen={selectedImg !== null}
        img={largeImageURL}
        tags={tags}
        onClose={() => setSelectedImg(null)}
      />
    </Item>
  );
};

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};
