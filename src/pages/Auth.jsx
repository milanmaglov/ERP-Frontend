// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import '../style/login.css';
import { Variables } from '../../Variables';
import { Navigate } from 'react-router-dom';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: '',
      redirectToHome: false
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    
    const { username, password } = this.state;

    const response = await fetch(Variables.API_URL + 'auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      // Store token and redirect to home
      localStorage.setItem('token', data.token);
      this.setState({ redirectToHome: true });
    } else {
      this.setState({ error: data.message || 'Invalid username or password' });
    }
  };

  render() {
    const { username, password, error, redirectToHome } = this.state;

    if (redirectToHome) {
      return <Navigate to="/" />;
    }

    return (
      <div className="login-container">
        <div className="login-form-wrapper">
          <form onSubmit={this.handleSubmit} className="login-form">
            <h2>Login</h2>
            {error && <p className="error-message">{error}</p>}
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={this.handleChange}
                required
              />
            </div>
            <button type="submit" className="login-button">Login</button>
          </form>
        </div>
      </div>
    );
  }
}
