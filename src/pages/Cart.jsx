import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken, getUserRole } from '../auth/auth'; // Update the path as needed
import { Variables } from '../../Variables'; // Update the path to where Variables is located
import '../style/cart.css'; // Import the CSS file

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = getToken();

      if (token) {
        const roleData = getUserRole(token);

        if (roleData && roleData.userId) {
          const url = `${Variables.API_URL}korpe/korisnik/?korisnikID=${roleData.userId}`;
          try {
            const response = await fetch(url, {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            });
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const cartData = await response.json();
            setCart(cartData);

            if (cartData && cartData.korpaID) {
              const itemsUrl = `${Variables.API_URL}StavkaKorpi/?korpaID=${cartData.korpaID}`;
              const itemsResponse = await fetch(itemsUrl, {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                }
              });
              if (!itemsResponse.ok) {
                throw new Error('Network response was not ok');
              }
              const itemsData = await itemsResponse.json();
              setCartItems(itemsData);

              // Calculate total price
              const total = itemsData.reduce((sum, item) => sum + item.ukupna_cena, 0);
              setTotalPrice(total);
            }
          } catch (error) {
            console.error('Failed to fetch user cart or items:', error);
            setError('Failed to fetch cart or items data');
          } finally {
            setLoading(false);
          }
        }
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (stavka_korpeID) => {
    const token = getToken();
    try {
      const deleteUrl = `${Variables.API_URL}StavkaKorpi/${stavka_korpeID}`;
      const response = await fetch(deleteUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to delete item');
      }
      // Update the state to remove the deleted item from the list
      const updatedItems = cartItems.filter(item => item.stavka_korpeID !== stavka_korpeID);
      setCartItems(updatedItems);

      // Recalculate total price
      const total = updatedItems.reduce((sum, item) => sum + item.ukupna_cena, 0);
      setTotalPrice(total);
    } catch (error) {
      console.error('Failed to delete item:', error);
      setError('Failed to delete item');
    }
  };

  const handleCheckout = () => {
    navigate('/checkout', { state: { totalAmount: totalPrice } });
  };

  return (
    <div className="cart-container">
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {cart && (
        <div className="cart">
          <h2>User Cart</h2>
          <div>Korpa ID: {cart.korpaID}</div>
          <div>Popust: {cart.popust}</div>
          {cartItems.length > 0 && (
            <div className="cart-items">
              <h3>Cart Items</h3>
              <table className="cart-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Instrument</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={`${item.korpaID}-${item.instrumentID}-${item.kolicina}`}>
                      <td>{item.stavka_korpeID}</td>
                      <td>{item.instrumentNaziv}</td>
                      <td>{item.kolicina}</td>
                      <td>{item.ukupna_cena}</td>
                      <td>
                        <button onClick={() => handleDelete(item.stavka_korpeID)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="total-price">
                <h3>Total Price: {totalPrice}</h3>
              </div>
              <button className="checkout-button" onClick={handleCheckout}>
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
