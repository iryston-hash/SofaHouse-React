import styled from 'styled-components';
import {HiPlusCircle, HiMinusCircle} from 'react-icons/hi';

const AmountButtons = ({amount, stock, decreaseAmount, increaseAmount}) => {
  return (
    <Wrapper className='amount-btns'>
      <button className='amount-btn' type='button' onClick={decreaseAmount}>
        <HiMinusCircle />
      </button>

      <h2 className='amount'>{amount}</h2>

      <button
        className='amount-btn'
        type='button'
        onClick={increaseAmount}
        style={{
          color: `${amount >= stock ? 'gray' : ''}`,
          transform: 'none',
        }}
      >
        <HiPlusCircle />
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  width: 140px;
  justify-items: center;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  h2 {
    margin-bottom: 0;
  }
  button {
    background: transparent;
    border-color: transparent;
    cursor: pointer;
    padding: 1rem 0;
    width: 2rem;
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  h2 {
    margin-bottom: 0;
  }

  .amount-btn {
    font-size: 3rem;
    transition: 0.3s;
    opacity: 0.7;
  }
  .amount-btn:hover {
    opacity: 1;
    transform: scale(1.2);
  }
`;

export default AmountButtons;
