import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useLocation } from 'react-router-dom';
import CheckoutForm from '../src/assets/CheckoutForm'; // Ensure the path is correct

// Load Stripe with your test publishable key
const stripePromise = loadStripe('pk_test_51PPkyKP1KAHYCFhDn9dIU6QTSi1Vvr8dHMkWi7X6MDAZx9xgULPpUhTdg8IiHp6DyXmXqJBaBAQaBEW22WNhThqz00e7KmpfAX');

const Checkout = () => {
  const location = useLocation();
  const { totalAmount } = location.state;

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm totalAmount={totalAmount} />
    </Elements>
  );
};

export default Checkout;
