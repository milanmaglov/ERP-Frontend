// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, Component } from 'react';
import '../style/Products.css';
import { Variables } from '../../Variables';

const InstrumentsList = () => {
    const [instruments, setInstruments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

    const imageMapping = {
        gibson: 'Gibson guitar.jpg',
        fender: 'fender guitar.jpg',
        taylor: 'Taylor guitar.jpg',
        'paul reed smith': 'PRS guitar.jpg'
    };

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

    const filteredInstruments = instruments
        .filter(instrument => instrument.naziv_proiz.toLowerCase().includes(filter.toLowerCase()))
        .sort((a, b) => sortOrder === 'asc' ? a.cena - b.cena : b.cena - a.cena);

    const itemsPerPage = 3;
    const totalPages = Math.ceil(filteredInstruments.length / itemsPerPage);
    const displayedInstruments = filteredInstruments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <h1>Error: {error}</h1>;
    }

    return (
    <div className="instrumentContainer">
        <div className="instruments-list">
            <h1>Musical Instruments</h1>
            <div className="controls">
                <input
                    type="text"
                    placeholder="Filter by Proizvodjac"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
                <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                    <option value="asc">Price: Low to High</option>
                    <option value="desc">Price: High to Low</option>
                </select>
            </div>
            <div className="horizontal-scroll">
                <ul>
                    {displayedInstruments.map((instrument) => {
                        const normalizedProizvodjac = instrument.naziv_proiz.toLowerCase();
                        const imageUrl = imageMapping[normalizedProizvodjac] || 'default.jpg';
                        return (
                            <li key={instrument.InstrumentID}>
                                <img 
                                    src={`/images/${imageUrl}`} 
                                    alt={instrument.naziv} 
                                    className="instrument-image" 
                                />
                                <h2>{instrument.naziv}</h2>
                                <p><strong>Cena:</strong> {instrument.cena}</p>
                                <p><strong>Godina Proizvodnje:</strong> {instrument.godina_proizvodnje}</p>
                                <p><strong>Deskripcija:</strong> {instrument.deskripcija}</p>
                                <p><strong>Proizvodjac:</strong> {instrument.naziv_proiz}</p>
                                <p><strong>Serija Muzicara:</strong> {instrument.serija_muzicara ? 'Yes' : 'No'}</p>
                                <p><strong>Vrsta:</strong> {instrument.naziv_vrste}</p>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => setCurrentPage(index + 1)}
                        className={index + 1 === currentPage ? 'active' : ''}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    </div>
    );
};

export class Products extends Component {
    render() {
        return (
            <div className = "header">
                <h1>Music World Store</h1>
                <InstrumentsList />
            </div>
        );
    }
}

export default Products;
