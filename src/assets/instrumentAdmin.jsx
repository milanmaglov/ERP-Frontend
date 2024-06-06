import React, { useState, useEffect } from 'react';
import { Table, Container, Button, Form, Modal } from 'react-bootstrap';
import { Variables } from '../../Variables';
import '../style/admin.css';

const InstrumentiAdmin = () => {
  const [instrumenti, setInstrumenti] = useState([]);
  const [proizvodjaci, setProizvodjaci] = useState([]);
  const [vrste, setVrste] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editInstrument, setEditInstrument] = useState(null);
  const [form, setForm] = useState({
    InstrumentID: '',
    naziv: '',
    cena: '',
    godina_proizvodnje: '',
    deskripcija: '',
    proizvodjacID: '',
    serija_muzicara: false,
    vrstaID: ''
  });

  useEffect(() => {
    fetchInstrumenti();
    fetchProizvodjaci();
    fetchVrste();
  }, []);

  const fetchInstrumenti = () => {
    const token = localStorage.getItem('token');

    fetch(Variables.API_URL + 'instrumenti', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        if (!response.ok) {
          return response.text().then(errorData => {
            throw new Error(errorData || 'Failed to fetch instrumenti');
          });
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched data:', data);
        setInstrumenti(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Fetch error:', error);
        setError(error);
        setLoading(false);
      });
  };

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
      })
      .catch(error => {
        console.error('Fetch error:', error);
        setError(error);
      });
  };

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
      })
      .catch(error => {
        console.error('Fetch error:', error);
        setError(error);
      });
  };

  const handleShowModal = (instrument = null) => {
    if (instrument) {
      setForm({ ...instrument });
      setEditInstrument(instrument);
    } else {
      setForm({
        InstrumentID: '',
        naziv: '',
        cena: '',
        godina_proizvodnje: '',
        deskripcija: '',
        proizvodjacID: '',
        serija_muzicara: false,
        vrstaID: ''
      });
      setEditInstrument(null);
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
    const method = editInstrument ? 'PUT' : 'POST';
    const url = Variables.API_URL + 'instrumenti';

    // Translate selected names to corresponding IDs
    const selectedProizvodjac = proizvodjaci.find(p => p.naziv_proiz === form.naziv_proiz);
    const selectedVrsta = vrste.find(v => v.naziv_vrste === form.naziv_vrste);

    const instrumentData = {
      ...form,
      proizvodjacID: selectedProizvodjac ? selectedProizvodjac.proizvodjacID : form.proizvodjacID,
      vrstaID: selectedVrsta ? selectedVrsta.vrstaID : form.vrstaID,
    };

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(instrumentData)
    })
      .then(response => {
        if (!response.ok) {
          return response.text().then(errorData => {
            throw new Error(errorData || 'Failed to save instrument');
          });
        }
        return response.json();
      })
      .then(() => {
        fetchInstrumenti();
        handleCloseModal();
      })
      .catch(error => {
        console.error('Save error:', error);
        setError(error);
      });
  };

  const handleDeleteClick = (instrumentID) => {
    const token = localStorage.getItem('token');
    const url = `${Variables.API_URL}instrumenti/${instrumentID}`;

    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(errorData => {
            throw new Error(errorData.message || 'Failed to delete instrument');
          });
        }
        fetchInstrumenti();
      })
      .catch(error => {
        console.error('Delete error:', error);
        setError(error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Container>
      <h1>Instrumenti</h1>
      <Button variant="primary" onClick={() => handleShowModal()}>Add Instrument</Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Instrument ID</th>
            <th>Naziv</th>
            <th>Cena</th>
            <th>Godina Proizvodnje</th>
            <th>Deskripcija</th>
            <th>Proizvođač</th>
            <th>Serija Muzičara</th>
            <th>Vrsta</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {instrumenti.map(instrument => (
            <tr key={instrument.instrumentID}>
              <td>{instrument.instrumentID}</td>
              <td>{instrument.naziv}</td>
              <td>{instrument.cena}</td>
              <td>{instrument.godina_proizvodnje}</td>
              <td>{instrument.deskripcija}</td>
              <td>{instrument.naziv_proiz}</td>
              <td>{instrument.serija_muzicara ? 'Yes' : 'No'}</td>
              <td>{instrument.naziv_vrste}</td>
              <td>
                <Button variant="primary" onClick={() => handleShowModal(instrument)} className="me-2">Edit</Button>
                <Button variant="danger" onClick={() => handleDeleteClick(instrument.instrumentID)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editInstrument ? 'Edit Instrument' : 'Add Instrument'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Naziv</Form.Label>
              <Form.Control
                type="text"
                name="naziv"
                value={form.naziv}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Cena</Form.Label>
              <Form.Control
                type="number"
                name="cena"
                value={form.cena}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Godina Proizvodnje</Form.Label>
              <Form.Control
                type="number"
                name="godina_proizvodnje"
                value={form.godina_proizvodnje}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Deskripcija</Form.Label>
              <Form.Control
                type="text"
                name="deskripcija"
                value={form.deskripcija}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Proizvođač</Form.Label>
              <Form.Control
                as="select"
                name="naziv_proiz"
                value={form.naziv_proiz}
                onChange={handleInputChange}
              >
                <option value="">Select Proizvođač</option>
                {proizvodjaci.map(proizvodjac => (
                  <option key={proizvodjac.proizvodjacID} value={proizvodjac.naziv_proiz}>
                    {proizvodjac.naziv_proiz}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Serija Muzičara</Form.Label>
              <Form.Check
                type="checkbox"
                name="serija_muzicara"
                checked={form.serija_muzicara}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Vrsta</Form.Label>
              <Form.Control
                as="select"
                name="naziv_vrste"
                value={form.naziv_vrste}
                onChange={handleInputChange}
              >
                <option value="">Select Vrsta</option>
                {vrste.map(vrsta => (
                  <option key={vrsta.vrstaID} value={vrsta.naziv_vrste}>
                    {vrsta.naziv_vrste}
                  </option>
                ))}
              </Form.Control>
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

export default InstrumentiAdmin;
