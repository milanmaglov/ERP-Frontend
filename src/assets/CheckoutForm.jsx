import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import '../style/CheckoutForm.css'; // Import your CSS file for styling

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      setError(null);
      setSuccess(true);
      console.log('PaymentMethod:', paymentMethod);
      // Here you would typically send the paymentMethod.id to your backend to create a payment
    }
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <div className="form-group">
        <label htmlFor="card-element">Credit or debit card</label>
        <CardElement id="card-element" className="card-element" />
      </div>
      <button type="submit" disabled={!stripe} className="submit-button">
        Pay
      </button>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">Payment Successful!</div>}
    </form>
  );
};

export default CheckoutForm;
