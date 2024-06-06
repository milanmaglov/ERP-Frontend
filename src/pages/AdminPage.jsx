// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import Proizvodjac from '../assets/proizvodjac'; 
import '../style/admin.css'; 
import Vrsta from '../assets/vrsta';
import Skladiste from '../assets/skladiste';
import Stanje from '../assets/stanje';
import InstrumentiAdmin from '../assets/instrumentAdmin';

const AdminPage = () => {
  const [selectedAsset, setSelectedAsset] = useState(null);

  const handleButtonClick = (asset) => {
    setSelectedAsset(asset);
  };

  const renderAsset = () => {
    switch (selectedAsset) {
      case 'Proizvodjac':
        return <Proizvodjac />;
      case 'Vrsta':
        return<Vrsta  />;
      case 'Skladiste':
        return <Skladiste />;
      case 'Stanje':
        return <Stanje />;
      case 'InstrumentiAdmin':
        return<InstrumentiAdmin />;
      default:
        return <div>Select an asset to view</div>;
    }
  };
  

  return (
    <Container className="admin-container">
      <h1>Admin Page</h1>
      <Row className="my-4">
        <Col>
          <Button onClick={() => handleButtonClick('Proizvodjac')} className ="customButton">Proizvodjac</Button>
        </Col>
        <Col>
          <Button onClick={() => handleButtonClick('Vrsta')} className ="customButton">Vrsta</Button>
        </Col>
        <Col>
          <Button onClick={() => handleButtonClick('Skladiste')} className ="customButton">Skladiste</Button>
        </Col>
        <Col>
          <Button onClick={() => handleButtonClick('Stanje')} className ="customButton">Stanje</Button>
        </Col>
        <Col>
          <Button onClick={() => handleButtonClick('InstrumentiAdmin')} className ="customButton">Instrument</Button>
        </Col>
        {/* Add more buttons here for other assets */}
      </Row>
      <Row>
        <Col>
          {renderAsset()}
        </Col>
      </Row>
    </Container>
  );
};

export default AdminPage;
