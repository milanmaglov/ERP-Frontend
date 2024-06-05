import React, { useState, useEffect } from 'react';
import { Table, Container, Button, Form, Modal } from 'react-bootstrap';
import { Variables } from '../../Variables'; // Make sure Variables contains your API URLs
import '../style/admin.css'; // Ensure this path is correct

const Stanje = () => {
  const [stanja, setStanja] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editStanje, setEditStanje] = useState(null);
  const [form, setForm] = useState({
    SkladisteID: 0,
    Kolicina: 0,
    InstrumentID: 0
  });

  useEffect(() => {
    fetchStanja();
  }, []);

  const fetchStanja = () => {
    const token = localStorage.getItem('token');

    fetch(Variables.API_URL + 'stanje', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setStanja(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  };

  const handleShowModal = (stanje = null) => {
    if (stanje) {
      setForm({ 
        SkladisteID: stanje.SkladisteID,
        Kolicina: stanje.Kolicina,
        InstrumentID: stanje.InstrumentID
      });
      setEditStanje({ SkladisteID: stanje.SkladisteID, InstrumentID: stanje.InstrumentID });
    } else {
      setForm({
        SkladisteID: '',
        Kolicina: 0,
        InstrumentID: ''
      });
      setEditStanje(null);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: val
    }));
  };

  const handleSaveClick = () => {
    const token = localStorage.getItem('token');
    const method = editStanje ? 'PUT' : 'POST';
    const url = Variables.API_URL + 'stanje';

    const body = editStanje 
      ? { ...form, ...editStanje } 
      : { ...form };

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (!response.ok) {
          return response.text().then(errorData => {
            throw new Error(errorData || 'Failed to save stanje');
          });
        }
        return response.text(); // Use response.text() to handle empty responses
      })
      .then(() => {
        fetchStanja(); 
        handleCloseModal(); 
      })
      .catch(error => setError(error));
  };

  const handleDeleteClick = (skladisteID, instrumentID) => {
    const token = localStorage.getItem('token');

    fetch(`${Variables.API_URL}stanje/${skladisteID}/${instrumentID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(errorData => {
            throw new Error(errorData.message || 'Failed to delete stanje');
          });
        }
        fetchStanja();
      })
      .catch(error => setError(error));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Container>
      <h1>Stanja</h1>
      <Button variant="primary" onClick={() => handleShowModal()}>Add Stanje</Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Skladiste ID</th>
            <th>Kolicina</th>
            <th>Instrument ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {stanja.map(stanje => (
            <tr key={`${stanje.SkladisteID}-${stanje.InstrumentID}`}>
              <td>{stanje.SkladisteID}</td>
              <td>{stanje.Kolicina}</td>
              <td>{stanje.InstrumentID}</td>
              <td>
                <Button variant="primary" onClick={() => handleShowModal(stanje)} className="me-2">Edit</Button>
                <Button variant="danger" onClick={() => handleDeleteClick(stanje.SkladisteID, stanje.InstrumentID)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editStanje ? 'Edit Stanje' : 'Add Stanje'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {editStanje && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Skladiste ID</Form.Label>
                  <Form.Control type="text" readOnly value={editStanje.SkladisteID} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Instrument ID</Form.Label>
                  <Form.Control type="text" readOnly value={editStanje.InstrumentID} />
                </Form.Group>
              </>
            )}
            {!editStanje && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Skladiste ID</Form.Label>
                  <Form.Control
                    type="text"
                    name="SkladisteID"
                    value={form.SkladisteID}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Instrument ID</Form.Label>
                  <Form.Control
                    type="text"
                    name="InstrumentID"
                    value={form.InstrumentID}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </>
            )}
            <Form.Group className="mb-3">
              <Form.Label>Kolicina</Form.Label>
              <Form.Control
                type="number"
                name="Kolicina"
                value={form.Kolicina}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
          <Button variant="primary" onClick={handleSaveClick}>Save</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Stanje;
