// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, Component } from 'react';
import '../style/Products.css';
import {Variables} from '../../Variables'

const InstrumentsList = () => {
    const [instruments, setInstruments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInstruments = async () => {
            try {
                const response = await fetch(Variables.API_URL + 'instrumenti'); 
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setInstruments(data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch instruments:', error);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchInstruments();
    }, []);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <h1>Error: {error}</h1>;
    }

    return (
        <div className="instruments-list">
            <h1>Musical Instruments</h1>
            <ul>
                {instruments.map((instrument) => (
                    <li key={instrument.InstrumentID}>
                        <h2>{instrument.naziv}</h2>
                        <p><strong>Cena:</strong> {instrument.cena}</p>
                        <p><strong>Godina Proizvodnje:</strong> {instrument.godina_proizvodnje}</p>
                        <p><strong>Deskripcija:</strong> {instrument.deskripcija}</p>
                        <p><strong>Proizvodjac:</strong> {instrument.naziv_proiz}</p>
                        <p><strong>Serija Muzicara:</strong> {instrument.serija_muzicara ? 'Yes' : 'No'}</p>
                        <p><strong>Vrsta:</strong> {instrument.naziv_vrste}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export class Products extends Component {
    render() {
        return (
            <div>
                <h1>Hello</h1>
                <InstrumentsList />
            </div>
        );
    }
}

export default Products;
