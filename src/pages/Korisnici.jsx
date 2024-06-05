import React, { useState, useEffect } from 'react';
import { Table, Container, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Variables } from '../../Variables';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editUserId, setEditUserId] = useState(null);
  const [editedUser, setEditedUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch(Variables.API_URL + 'korisnici', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleEditClick = (user) => {
    setEditUserId(user.korisnikID);
    setEditedUser({ ...user });
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevEditedUser) => ({
      ...prevEditedUser,
      [name]: value
    }));
  }

  const handleSaveClick = () => {
    const token = localStorage.getItem('token');

    fetch(Variables.API_URL + 'korisnici', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(editedUser)
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(errorData => {
            throw new Error(errorData.message || 'Failed to update user');
          });
        }
        return response.json();
      })
      .then(() => {
        setUsers((prevUsers) => prevUsers.map(user => user.korisnikID === editedUser.korisnikID ? editedUser : user));
        setEditUserId(null);
        setEditedUser({});
      })
      .catch(error => setError(error));
  }

  const handleDeleteClick = (userId) => {
    const token = localStorage.getItem('token');

    fetch(`${Variables.API_URL}korisnici/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(errorData => {
            throw new Error(errorData.message || 'Failed to delete user');
          });
        }
        setUsers((prevUsers) => prevUsers.filter(user => user.korisnikID !== userId));
      })
      .catch(error => setError(error));
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Container>
      <h1 className="my-4">Users</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Role</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Registration Date</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.korisnikID}>
              <td>{user.korisnikID}</td>
              <td>{user.korisnickoIme}</td>
              <td>
                {editUserId === user.korisnikID ? (
                  <Form.Control
                    type="text"
                    name="uloga"
                    value={editedUser.uloga}
                    onChange={handleInputChange}
                  />
                ) : (
                  user.uloga
                )}
              </td>
              <td>
                {editUserId === user.korisnikID ? (
                  <Form.Control
                    type="email"
                    name="email"
                    value={editedUser.email}
                    onChange={handleInputChange}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {editUserId === user.korisnikID ? (
                  <Form.Control
                    type="text"
                    name="broj"
                    value={editedUser.broj}
                    onChange={handleInputChange}
                  />
                ) : (
                  user.broj
                )}
              </td>
              <td>{new Date(user.datum_prijave).toLocaleDateString()}</td>
              <td>
                {editUserId === user.korisnikID ? (
                  <Form.Control
                    type="text"
                    name="adresa"
                    value={editedUser.adresa}
                    onChange={handleInputChange}
                  />
                ) : (
                  user.adresa
                )}
              </td>
              <td>
                {editUserId === user.korisnikID ? (
                  <Button variant="success" onClick={handleSaveClick}>Save</Button>
                ) : (
                  <>
                    <Button variant="primary" onClick={() => handleEditClick(user)} className="me-2">Edit</Button>
                    <Button variant="danger" onClick={() => handleDeleteClick(user.korisnikID)} className="ms-2">Delete</Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Users;
