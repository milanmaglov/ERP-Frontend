import React, { Component } from 'react';
import { Table, Container, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Variables } from '../../Variables';

export class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: true,
      error: null,
      editUserId: null,
      editedUser: {}
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('token');

    fetch(Variables.API_URL + 'korisnici', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => this.setState({ users: data, loading: false }))
      .catch(error => this.setState({ error, loading: false }));
  }

  handleEditClick = (user) => {
    this.setState({ editUserId: user.korisnikID, editedUser: { ...user } });
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      editedUser: {
        ...prevState.editedUser,
        [name]: value
      }
    }));
  }

  handleSaveClick = () => {
    const { editedUser } = this.state;
    const token = localStorage.getItem('token');

    fetch(Variables.API_URL + 'korisnici', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        korisnikID: editedUser.korisnikID,
        korisnickoIme: editedUser.korisnickoIme,
        uloga: editedUser.uloga,
        email: editedUser.email,
        broj: editedUser.broj,
        datum_prijave: editedUser.datum_prijave,
        adresa: editedUser.adresa
      })
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
        this.setState((prevState) => ({
          users: prevState.users.map(user => user.korisnikID === editedUser.korisnikID ? editedUser : user),
          editUserId: null,
          editedUser: {}
        }));
      })
      .catch(error => this.setState({ error }));
  }

  render() {
    const { users, loading, error, editUserId, editedUser } = this.state;

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
                      onChange={this.handleInputChange}
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
                      onChange={this.handleInputChange}
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
                      onChange={this.handleInputChange}
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
                      onChange={this.handleInputChange}
                    />
                  ) : (
                    user.adresa
                  )}
                </td>
                <td>
                  {editUserId === user.korisnikID ? (
                    <Button variant="success" onClick={this.handleSaveClick}>Save</Button>
                  ) : (
                    <Button variant="primary" onClick={() => this.handleEditClick(user)}>Edit</Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    );
  }
}

export default Users;
