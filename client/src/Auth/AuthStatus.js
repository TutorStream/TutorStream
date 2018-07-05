import React from 'react';
import { withRouter } from 'react-router-dom';
import AuthService from './AuthService';
import { NavItem } from 'react-bootstrap';

const AuthStatus = withRouter(({ history }) => (
    AuthService.isAuthenticated ? (
      <NavItem onClick={() => {
          AuthService.logout(() => history.push('/'))
        }}>Sign out</NavItem>
    ) : (
      <NavItem onClick={() => history.push('/login')}>Log In Page</NavItem>
    )
))

export default AuthStatus