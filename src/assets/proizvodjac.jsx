// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Table, Container, Button, Form, Modal } from 'react-bootstrap';
import { Variables } from '../../Variables'; 
import '../style/admin.css'; 

const Proizvodjac = () => {
  const [proizvodjaci, setProizvodjaci] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editProizvodjac, setEditProizvodjac] = useState(null);
  const [form, setForm] = useState({
    Naziv_proiz: '',
    godina_osn: '',
    Pred_partner: false
  });

  useEffect(() => {
    fetchProizvodjaci();
  }, []);

  const fetchProizvodjaci = () => {
    const token = localStorage.getItem('token');

    fetch(Variables.API_URL + 'proizvodjaci', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setProizvodjaci(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  };

  const handleShowModal = (proizvodjac = null) => {
    if (proizvodjac) {
      setForm({ 
        Naziv_proiz: proizvodjac.naziv_proiz,
        godina_osn: proizvodjac.godina_osn,
        Pred_partner: proizvodjac.pred_partner
      });
      setEditProizvodjac(proizvodjac.proizvodjacID);
    } else {
      setForm({
        Naziv_proiz: '',
        godina_osn: '',
        Pred_partner: false
      });
      setEditProizvodjac(null);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: val
    }));
  };

  const handleSaveClick = () => {
    const token = localStorage.getItem('token');
    const method = editProizvodjac ? 'PUT' : 'POST';
    const url = Variables.API_URL + 'proizvodjaci';

    const body = editProizvodjac 
      ? { ...form, proizvodjacID: editProizvodjac } 
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
            throw new Error(errorData || 'Failed to save proizvodjac');
          });
        }
        return response.text(); 
      })
      .then(() => {
        fetchProizvodjaci(); 
        handleCloseModal(); 
      })
      .catch(error => setError(error));
  };

  const handleDeleteClick = (proizvodjacID) => {
    const token = localStorage.getItem('token');

    fetch(`${Variables.API_URL}proizvodjaci/${proizvodjacID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(errorData => {
            throw new Error(errorData.message || 'Failed to delete proizvodjac');
          });
        }
        fetchProizvodjaci();
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
      <h1>Proizvodjaci</h1>
      <Button variant="primary" onClick={() => handleShowModal()}>Add Proizvodjac</Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Naziv Proizvodjaca</th>
            <th>Godina Osnivanja</th>
            <th>Pred Partner</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {proizvodjaci.map(proizvodjac => (
            <tr key={proizvodjac.proizvodjacID}>
              <td>{proizvodjac.proizvodjacID}</td>
              <td>{proizvodjac.naziv_proiz}</td>
              <td>{proizvodjac.godina_osn}</td>
              <td>{proizvodjac.pred_partner ? 'Yes' : 'No'}</td>
              <td>
                <Button variant="primary" onClick={() => handleShowModal(proizvodjac)} className="me-2">Edit</Button>
                <Button variant="danger" onClick={() => handleDeleteClick(proizvodjac.proizvodjacID)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editProizvodjac ? 'Edit Proizvodjac' : 'Add Proizvodjac'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {editProizvodjac && (
              <Form.Group className="mb-3">
                <Form.Label>ID</Form.Label>
                <Form.Control type="text" readOnly value={editProizvodjac} />
              </Form.Group>
            )}
            <Form.Group className="mb-3">
              <Form.Label>Naziv Proizvodjaca</Form.Label>
              <Form.Control
                type="text"
                name="Naziv_proiz"
                value={form.Naziv_proiz}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Godina Osnivanja</Form.Label>
              <Form.Control
                type="number"
                name="godina_osn"
                value={form.godina_osn}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Pred Partner"
                name="Pred_partner"
                checked={form.Pred_partner}
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

export default Proizvodjac;
