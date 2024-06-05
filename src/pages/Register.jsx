import React, { Component } from 'react';
import '../style/register.css';
import { Navigate, Link } from 'react-router-dom';
import { Variables } from '../../Variables';

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      korisnickoIme: '',
      Lozinka_hash: '',
      email: '',
      broj: '',
      datum_prijave: '',
      adresa: '',
      error: '',
      redirectToLogin: false,
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const { korisnickoIme, Lozinka_hash, email, broj, datum_prijave, adresa } = this.state;

    const Lozinka_salt = 'salt'; 
    const uloga = 'kupac'; 

    const response = await fetch(Variables.API_URL + 'korisnici', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ korisnickoIme, Lozinka_hash, Lozinka_salt, uloga, email, broj, datum_prijave, adresa })
    });

    const data = await response.json();

    if (response.ok) {
      this.setState({ redirectToLogin: true });
    } else {
      this.setState({ error: data.message || 'Registration failed' });
    }
  };

  render() {
    const { korisnickoIme, Lozinka_hash, email, broj, datum_prijave, adresa, error, redirectToLogin } = this.state;

    if (redirectToLogin) {
      return <Navigate to="/login" />;
    }

    return (
      <div className="register-container">
        <div className="register-form-wrapper">
          <form onSubmit={this.handleSubmit} className="register-form">
            <h2>Register</h2>
            {error && <p className="error-message">{error}</p>}
            <div className="form-group">
              <label htmlFor="korisnickoIme">Username:</label>
              <input
                type="text"
                id="korisnickoIme"
                value={korisnickoIme}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="Lozinka_hash">Password:</label>
              <input
                type="password"
                id="Lozinka_hash"
                value={Lozinka_hash}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="broj">Phone Number:</label>
              <input
                type="text"
                id="broj"
                value={broj}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="datum_prijave">Registration Date:</label>
              <input
                type="date"
                id="datum_prijave"
                value={datum_prijave}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="adresa">Address:</label>
              <input
                type="text"
                id="adresa"
                value={adresa}
                onChange={this.handleChange}
                required
              />
            </div>
            <button type="submit" className="register-button">Register</button>
          </form>
          <p className="login-link">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    );
  }
}

export default Register;
