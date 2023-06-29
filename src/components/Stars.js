import styled from 'styled-components';
import {BsStarFill, BsStarHalf, BsStar} from 'react-icons/bs';

const Stars = ({reviews, stars}) => {
  const rating = Array.from({length: 5}, (_, index) => {
    const floatNumber = index + 0.5;
    return (
      <span key={index}>
        {stars > index + 1 ? (
          <BsStarFill />
        ) : stars > floatNumber ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
      </span>
    );
  });
  return (
    <Wrapper>
      <div className='stars' style={{background: '#FFF8D6', padding: '0 5px'}}>
        {rating}
      </div>
      <p className='reviews'>Reviews: ({reviews})</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    color: #ffb900;
    font-size: 1rem;
    margin-right: 0.25rem;
  }
  p {
    margin-left: 0.5rem;
    margin-bottom: 0;
    text-transform: capitalize;
  }
  margin-bottom: 0.5rem;
`;
export default Stars;
