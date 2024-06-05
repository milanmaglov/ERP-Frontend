// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Table, Container, Button, Form, Modal } from 'react-bootstrap';
import { Variables } from '../../Variables';
import '../style/admin.css'; 

const Skladiste = () => {
  const [skladista, setSkladista] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editSkladiste, setEditSkladiste] = useState(null);
  const [form, setForm] = useState({
    adresa: '',
    cena_zakupa: 0
  });

  useEffect(() => {
    fetchSkladista();
  }, []);

  const fetchSkladista = () => {
    const token = localStorage.getItem('token');

    fetch(Variables.API_URL + 'skladista', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setSkladista(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  };

  const handleShowModal = (skladiste = null) => {
    if (skladiste) {
      setForm({ 
        adresa: skladiste.adresa,
        cena_zakupa: skladiste.cena_zakupa
      });
      setEditSkladiste(skladiste.skladisteID);
    } else {
      setForm({
        adresa: '',
        cena_zakupa: 0
      });
      setEditSkladiste(null);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    const val = type === 'number' ? parseInt(value) : value;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: val
    }));
  };

  const handleSaveClick = () => {
    const token = localStorage.getItem('token');
    const method = editSkladiste ? 'PUT' : 'POST';
    const url = Variables.API_URL + 'skladista';

    const body = editSkladiste 
      ? { ...form, skladisteID: editSkladiste } 
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
            throw new Error(errorData || 'Failed to save skladiste');
          });
        }
        return response.text(); 
      })
      .then(() => {
        fetchSkladista(); 
        handleCloseModal(); 
      })
      .catch(error => setError(error));
  };

  const handleDeleteClick = (skladisteID) => {
    const token = localStorage.getItem('token');

    fetch(`${Variables.API_URL}skladista/${skladisteID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(errorData => {
            throw new Error(errorData.message || 'Failed to delete skladiste');
          });
        }
        fetchSkladista();
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
      <h1>Skladista</h1>
      <Button variant="primary" onClick={() => handleShowModal()}>Add Skladiste</Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Adresa</th>
            <th>Cena Zakupa</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {skladista.map(skladiste => (
            <tr key={skladiste.skladisteID}>
              <td>{skladiste.skladisteID}</td>
              <td>{skladiste.adresa}</td>
              <td>{skladiste.cena_zakupa}</td>
              <td>
                <Button variant="primary" onClick={() => handleShowModal(skladiste)} className="me-2">Edit</Button>
                <Button variant="danger" onClick={() => handleDeleteClick(skladiste.skladisteID)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editSkladiste ? 'Edit Skladiste' : 'Add Skladiste'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {editSkladiste && (
              <Form.Group className="mb-3">
                <Form.Label>ID</Form.Label>
                <Form.Control type="text" readOnly value={editSkladiste} />
              </Form.Group>
            )}
            <Form.Group className="mb-3">
              <Form.Label>Adresa</Form.Label>
              <Form.Control
                type="text"
                name="adresa"
                value={form.adresa}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Cena Zakupa</Form.Label>
              <Form.Control
                type="number"
                name="cena_zakupa"
                value={form.cena_zakupa}
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

export default Skladiste;
