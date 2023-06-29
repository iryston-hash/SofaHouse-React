import styled from 'styled-components';
import {useCartContext} from '../context/cart_context';
import {useUserContext} from '../context/user_context';
import {formatPrice} from '../utils/helpers';
import {Link} from 'react-router-dom';

const CartTotals = () => {
  const {fee, total_price} = useCartContext();
  const {appUser, loginWithRedirect} = useUserContext();
  return (
    <Wrapper>
      <div>
        <article>
          <h5>
            subtotal: <span>{formatPrice(total_price)}</span>
          </h5>
          <p>
            shipping fee: <span>{formatPrice(fee)}</span>
          </p>
          <hr />
          <h4>
            order total: <span>{formatPrice(total_price + fee)}</span>
          </h4>
        </article>
        {appUser ? (
          <Link to='/checkout' className='btn'>
            checkout
          </Link>
        ) : (
          <div>
            <button className='btn' type='button' onClick={loginWithRedirect}>  
              login
            </button>
            <span>
              please login in order to <strong>purchace</strong>
            </span>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  article {
    border: 1px solid var(--clr-grey-8);
    border-radius: var(--radius);
    padding: 1.5rem 3rem;
  }
  h4,
  h5,
  p {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
  p {
    text-transform: capitalize;
  }
  h4 {
    margin-top: 2rem;
  }
  @media (min-width: 776px) {
    justify-content: flex-end;
  }
  .btn {
    width: 100%;
    margin-top: 1rem;
    text-align: center;
    font-weight: 700;
    margin-bottom: 0.3rem;
  }
  span {
    opacity: 0.7;
    text-transform: underline;
    text-align: center;
    display: block;
  }
`;

export default CartTotals;
