import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../src/assets/CheckoutForm';

const stripePromise = loadStripe('pk_test_51PPkyKP1KAHYCFhDn9dIU6QTSi1Vvr8dHMkWi7X6MDAZx9xgULPpUhTdg8IiHp6DyXmXqJBaBAQaBEW22WNhThqz00e7KmpfAX'); 

const Checkout = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Checkout;
