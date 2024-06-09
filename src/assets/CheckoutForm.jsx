import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import '../style/CheckoutForm.css';
import { Variables } from '../../Variables';

const CheckoutForm = ({ totalAmount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const response = await fetch(`${Variables.API_URL}StripeController/create-payment-intent`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ amount: totalAmount * 100 }) // Convert to cents
        });

        const data = await response.json();
        if (response.ok) {
          setClientSecret(data.clientSecret);
        } else {
          console.error("Error creating payment intent:", data.error);
        }
      } catch (error) {
        console.error("Error creating payment intent:", error);
      }
    };

    createPaymentIntent();
  }, [totalAmount]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    const card = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
      }
    });

    if (error) {
      setError(error.message);
    } else {
      setError(null);
      setSuccess(true);
      console.log('PaymentIntent:', paymentIntent);
      // Navigate to success page or display success message
    }
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <div className="form-group">
        <label htmlFor="card-element">Credit or debit card</label>
        <CardElement id="card-element" className="card-element" />
      </div>
      <button type="submit" disabled={!stripe || !clientSecret} className="submit-button">
        Pay
      </button>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">Payment Successful!</div>}
    </form>
  );
};

export default CheckoutForm;
