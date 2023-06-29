import styled from 'styled-components';
import {PageHero, StripeCheckout} from '../components';
import {useCartContext} from '../context/cart_context';
import {Link} from 'react-router-dom';
import emptyCart from '../assets/emptyCart.svg';

const CheckoutPage = () => {
  const {cart} = useCartContext();
  return (
    <main>
      <PageHero title='checkout' />
      <Wrapper className='page'>
        {cart.length < 1 ? (
          <div className='empty'>
            <h2>cart is empty</h2>
            <img src={emptyCart} alt='empty cart' className='empty-cart' />
            <Link to='/products' className='btn'>
              browse shop
            </Link>
          </div>
        ) : (
          <StripeCheckout />
        )}
      </Wrapper>
    </main>
  );
};
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .empty {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: 1rem;
  }
  .empty-cart {
    max-width: 23dvw;
    min-width: 80%;
    border-radius: 10%;
    margin-bottom: 1rem;
  }
`;
export default CheckoutPage;
