import React, { useState, useEffect } from 'react';
import { Table, Container, Button, Form, Modal } from 'react-bootstrap';
import { Variables } from '../../Variables'; // Make sure Variables contains your API URLs
import '../style/admin.css'; // Ensure this path is correct

const Vrsta = () => {
  const [vrste, setVrste] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editVrsta, setEditVrsta] = useState(null);
  const [form, setForm] = useState({
    naziv_vrste: '',
    PogodanLevoruke: false
  });

  useEffect(() => {
    fetchVrste();
  }, []);

  const fetchVrste = () => {
    const token = localStorage.getItem('token');

    fetch(Variables.API_URL + 'vrste', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setVrste(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  };

  const handleShowModal = (vrsta = null) => {
    if (vrsta) {
      setForm({ 
        naziv_vrste: vrsta.naziv_vrste,
        PogodanLevoruke: vrsta.PogodanLevoruke
      });
      setEditVrsta(vrsta.vrstaID);
    } else {
      setForm({
        naziv_vrste: '',
        PogodanLevoruke: false
      });
      setEditVrsta(null);
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
    const method = editVrsta ? 'PUT' : 'POST';
    const url = Variables.API_URL + 'vrste';

    const body = editVrsta 
      ? { ...form, vrstaID: editVrsta } 
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
            throw new Error(errorData || 'Failed to save vrsta');
          });
        }
        return response.text(); // Use response.text() to handle empty responses
      })
      .then(() => {
        fetchVrste(); // Refresh the data
        handleCloseModal(); // Close the modal
      })
      .catch(error => setError(error));
  };

  const handleDeleteClick = (vrstaID) => {
    const token = localStorage.getItem('token');

    fetch(`${Variables.API_URL}vrste/${vrstaID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(errorData => {
            throw new Error(errorData.message || 'Failed to delete vrsta');
          });
        }
        fetchVrste();
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
      <h1>Vrste</h1>
      <Button variant="primary" onClick={() => handleShowModal()}>Add Vrsta</Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Naziv Vrste</th>
            <th>Pogodan Levoruke</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vrste.map(vrsta => (
            <tr key={vrsta.vrstaID}>
              <td>{vrsta.vrstaID}</td>
              <td>{vrsta.naziv_vrste}</td>
              <td>{vrsta.PogodanLevoruke ? 'Yes' : 'No'}</td>
              <td>
                <Button variant="primary" onClick={() => handleShowModal(vrsta)} className="me-2">Edit</Button>
                <Button variant="danger" onClick={() => handleDeleteClick(vrsta.vrstaID)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editVrsta ? 'Edit Vrsta' : 'Add Vrsta'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {editVrsta && (
              <Form.Group className="mb-3">
                <Form.Label>ID</Form.Label>
                <Form.Control type="text" readOnly value={editVrsta} />
              </Form.Group>
            )}
            <Form.Group className="mb-3">
              <Form.Label>Naziv Vrste</Form.Label>
              <Form.Control
                type="text"
                name="naziv_vrste"
                value={form.naziv_vrste}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Pogodan Levoruke"
                name="PogodanLevoruke"
                checked={form.PogodanLevoruke}
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

export default Vrsta;
