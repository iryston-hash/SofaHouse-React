import styled from 'styled-components';
import {useState, useEffect} from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {
  CardElement,
  useStripe,
  Elements,
  useElements,
} from '@stripe/react-stripe-js';
import axios from 'axios';
import {useCartContext} from '../context/cart_context';
import {useUserContext} from '../context/user_context';
import {formatPrice} from '../utils/helpers';
import {useNavigate} from 'react-router-dom';
import {FiClipboard} from 'react-icons/fi';

const promise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const CheckoutForm = () => {
  const {cart, total_price, fee, clearCart} = useCartContext();
  const {appUser} = useUserContext();
  const navigate = useNavigate();
  // STRIPE
  const [successfulPayment, setSuccessfulPayment] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientKey, setClientKey] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  const cardStyle = {
    style: {
      base: {
        iconColor: '#c4f0ff',
        color: '#000',
        fontWeight: '500',
        fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
        fontSize: '16px',
        fontSmoothing: 'antialiased',
        ':-webkit-autofill': {
          color: '#fce883',
        },
        '::placeholder': {
          color: '#87BBFD',
        },
      },
      invalid: {
        iconColor: '#FFC7EE',
        color: '#FFC7EE',
      },
    },
  };

  const createPaymentProcess = async () => {
    try {
      const {data} = await axios.post(
        '/.netlify/functions/payment-intent',
        JSON.stringify({cart, fee, total_price})
      );
      setClientKey(data.clientSecret);
    } catch (error) {
      console.log(`${error}: payment error 💰`);
    }
  };

  useEffect(() => {
    createPaymentProcess();
    // eslint-disable-next-line
  }, []);

  const handleChange = async (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : '');
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientKey, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    if (payload.error) {
      setError(`Payment unsuccessful ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(true);
      setSuccessfulPayment(true);
      setTimeout(() => {
        clearCart();
        navigate('/');
      }, 15000);
    }
  };

  return (
    <div>
      {successfulPayment ? (
        <article>
          <h3>
            Payment
            <span className='payment__successful-green'>successful</span>
          </h3>
          <h4>check your email after 10 minutes for more information</h4>
        </article>
      ) : (
        <article>
          <h4>Greetings, {appUser && appUser.name}</h4>
          <hr />
          <h5 className='pending-payment'>
            payment amount:
            <span className='total-price'>
              {formatPrice(fee + total_price)}
            </span>
          </h5>
          <div className='clipboard' style={{display: 'flex'}}>
            <p> click to copy the test card number: </p>
            <button
              className='button__clipboard'
              onClick={() => {
                navigator.clipboard.writeText('4242 4242 4242 4242');
              }}
            >
              4242 4242 4242 4242 <FiClipboard />
            </button>
          </div>
        </article>
      )}
      <form id='payment-form' onSubmit={handleSubmit}>
        <CardElement
          id='card-element'
          options={cardStyle}
          onChange={handleChange}
        />
        <button
          disabled={processing || disabled || successfulPayment}
          id='submit'
        >
          <span id='button-text'>
            {processing ? (
              <div className='spinner' id='spinner'></div>
            ) : (
              'Process payment'
            )}
          </span>
        </button>
        {/* stripe Error */}
        {error && (
          <div className='card-error' role='alert'>
            {error}
          </div>
        )}
        {/* stripe successfulPayment message */}
        <br />
        <p
          className={
            successfulPayment ? 'result-message' : 'result-message hidden'
          }
        >
          Payment is successful, click
          <a
            href={'https://dashboard.stripe.com/test/payments '}
            target='_blank'
            rel='noreferrer'
          >
            {` stripe DASHBOARD `}
          </a>
          to see more information.
        </p>
      </form>
    </div>
  );
};

const StripeCheckout = () => {
  return (
    <Wrapper>
      <Elements stripe={promise}>
        <CheckoutForm />
      </Elements>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  article {
    text-align: center;
  }
  .pending-payment {
    display: flex;
    text-align: center;
    align-content: center;
    justify-content: space-evenly;
    align-items: center;
  }
  .payment__successful-green {
    color: green;
  }
  .total-price {
    color: white;
    font-size: 1.2rem;
    padding: 0.3rem 0.6rem;
    border-radius: 0.6rem;
    background: var(--clr-primary-4);
    max-width: 50dvw;
    margin: 1rem 0;
    margin-left: 0.2rem;
  }
  .clipboard {
    display: flex;
    flex-direction: column-reverse;
  }
  .button__clipboard {
    display: flex;
    font-weight: 300;
    align-items: center;
    justify-content: space-around;
    margin: 0 auto;
    width: 20vw;
    padding: 0.1rem;
    border-radius: 0.5rem;
    opacity: 0.9;
  }
  .button__clipboard:hover {
    opacity: 1;
    transform: scale(1.1);
  }
  form {
    width: 80dvw;
    align-self: center;
    box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
      0px 2px 5px 0px rgba(50, 50, 93, 0.1),
      0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
    border-radius: 7px;
    padding: 40px;
    margin-top: 12rem;
    margin: 0 auto;
  }
  form > p {
    text-align: center;
  }
  input {
    border-radius: 6px;
    margin-bottom: 6px;
    padding: 12px;
    border: 1px solid rgba(50, 50, 93, 0.1);
    max-height: 44px;
    font-size: 16px;
    width: 100%;
    background: white;
    box-sizing: border-box;
  }

  .result-message {
    line-height: 22px;
    font-size: 16px;
  }
  .result-message a {
    color: rgb(89, 111, 214);
    font-weight: 600;
    text-decoration: none;
  }
  .hidden {
    display: none;
  }
  #card-error {
    color: rgb(105, 115, 134);
    font-size: 16px;
    line-height: 20px;
    margin-top: 12px;
    text-align: center;
  }
  #card-element {
    border-radius: 4px 4px 0 0;
    padding: 12px;
    border: 1px solid rgba(50, 50, 93, 0.1);
    max-height: 44px;
    width: 100%;
    background: white;
    box-sizing: border-box;
  }
  #payment-request-button {
    margin-bottom: 32px;
  }
  /* Buttons and links */
  button {
    background: var(--clr-primary-2);
    color: #ffffff;
    border-radius: 0 0 4px 4px;
    border: 0;
    padding: 12px 16px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    display: block;
    transition: all 0.2s ease;
    box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
    width: 100%;
  }
  button:hover {
    cursor: pointer;
    filter: contrast(115%);
  }
  button:disabled {
    opacity: 0.5;
    cursor: default;
  }
  /* spinner/processing state, errors */
  .spinner,
  .spinner:before,
  .spinner:after {
    border-radius: 50%;
  }
  .spinner {
    color: #ffffff;
    font-size: 22px;
    text-indent: -99999px;
    margin: 0px auto;
    position: relative;
    width: 20px;
    height: 20px;
    box-shadow: inset 0 0 0 2px;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
  }
  .spinner:before,
  .spinner:after {
    position: absolute;
    content: '';
  }
  .spinner:before {
    width: 10.4px;
    height: 20.4px;
    background: #5469d4;
    border-radius: 20.4px 0 0 20.4px;
    top: -0.2px;
    left: -0.2px;
    -webkit-transform-origin: 10.4px 10.2px;
    transform-origin: 10.4px 10.2px;
    -webkit-animation: loading 2s infinite ease 1.5s;
    animation: loading 2s infinite ease 1.5s;
  }
  .spinner:after {
    width: 10.4px;
    height: 10.2px;
    background: #5469d4;
    border-radius: 0 10.2px 10.2px 0;
    top: -0.1px;
    left: 10.2px;
    -webkit-transform-origin: 0px 10.2px;
    transform-origin: 0px 10.2px;
    -webkit-animation: loading 2s infinite ease;
    animation: loading 2s infinite ease;
  }
  @keyframes loading {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @media only screen and (max-width: 600px) {
    form {
      width: 90dvw;
    }
  }
`;

export default StripeCheckout;
