require('dotenv').config();

const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY);

exports.handler = async function (event, context) {
  if (event.body) {
    const {fee, total_price} = JSON.parse(event.body);
    console.log(total_price);

    const calculateOrderAmount = () => {
      return fee + total_price;
    };
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(),
        currency: 'eur',
      });
      return {
        statusCode: 200,
        body: JSON.stringify({clientSecret: paymentIntent.client_secret}),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({errorMessage: error.message}),
      };
    }
  } else {
    return {
      statusCode: 200,
      body: 'payment-intent',
    };
  }
};
