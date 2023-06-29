import {useState, useEffect} from 'react';
import styled from 'styled-components';

const ProductImages = ({images = [{url: ''}]}) => {
  const [main, setMain] = useState(images[0].url);

  useEffect(() => {
    if (images[0].url !== '') {
      setMain(images[0]);
    }
  }, [images]);

  return (
    <Wrapper>
      <img className='main' src={main.url} alt='current product' />
      <div className='gallery'>
        {images.map((image, i) => {
          return (
            <img
              key={i}
              className={`${image.url === main.url ? 'active' : ''}`}
              src={image.url}
              onClick={() => setMain(images[i])}
              alt={image.filename}
            />
          );
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .main {
    height: 600px;
  }
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    object-fit: cover;
  }
  .gallery {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 1rem;
    img {
      height: 100px;
      cursor: pointer;
      transition: 0.3s;
    }
    img:hover {
      transform: translateY(5px);
    }
  }
  .active {
    box-shadow: 0px 0px 6px 4px black;
  }
  @media (max-width: 576px) {
    .main {
      height: 300px;
    }
    .gallery {
      img {
        height: 50px;
      }
    }
  }
  @media (min-width: 992px) {
    .main {
      height: 500px;
    }
    .gallery {
      img {
        height: 75px;
      }
    }
  }
`;

export default ProductImages;
