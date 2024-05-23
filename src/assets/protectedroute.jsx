import React, { Component } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getToken, getUserRole } from '../auth/auth';

export class ProtectedRoute extends Component {
  render() {
    const { roles } = this.props;
    const token = getToken();
    const userRole = getUserRole(token);

    if (!token) {
      return <Navigate to="/login" replace />;
    }

    if (roles && roles.indexOf(userRole) === -1) {
      return <Navigate to="/" replace />;
    }

    return <Outlet />;
  }
}

export default ProtectedRoute;
