import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../style/productdetails.css';
import { Variables } from '../../Variables';

const ProductDetails = () => {
    const location = useLocation();
    const { instrument, korpaID } = location.state;
    const [kolicina, setKolicina] = useState(1);

    const handleAddToCart = async () => {
        try {
            const response = await fetch(Variables.API_URL + 'StavkaKorpi', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    InstrumentID: instrument.instrumentID, // Make sure to use correct case
                    KorpaID: korpaID,
                    kolicina
                })
            });

            if (!response.ok) {
                throw new Error('Failed to add to cart');
            }

            alert('Added to cart successfully');
            console.log('Added to cart:', instrument);
            // navigate('/cart'); // Navigate to cart page or some confirmation page
        } catch (error) {
            console.error('Failed to add to cart:', error);
        }
    };

    return (
        <div className="product-details-container">
            <img src={`/images/scott-scottpilgrim.gif`} alt="Left Gif" className="side-gif" />
            <div className="product-details">
                <h1>{instrument.naziv}</h1>
                <img src={`/images/${instrument.imageUrl}`} alt={instrument.naziv} className="instrument-image" />
                <p><strong>Cena:</strong> {instrument.cena}</p>
                <p><strong>Godina Proizvodnje:</strong> {instrument.godina_proizvodnje}</p>
                <p><strong>Deskripcija:</strong> {instrument.deskripcija}</p>
                <p><strong>Proizvodjac:</strong> {instrument.naziv_proiz}</p>
                <p><strong>Serija Muzicara:</strong> {instrument.serija_muzicara ? 'Yes' : 'No'}</p>
                <p><strong>Vrsta:</strong> {instrument.naziv_vrste}</p>
                <label>
                    <strong>Kolicina:</strong>
                    <input 
                        type="number" 
                        value={kolicina} 
                        onChange={(e) => setKolicina(e.target.value)} 
                        min="1" 
                    />
                </label>
                <button onClick={handleAddToCart}>Add to Cart</button>
            </div>
            <img src={`/images/music-rock.gif`} alt="Right Gif" className="side-gif" />
        </div>
    );
};

export default ProductDetails;
