import React from 'react'
import { withRouter } from 'react-router-dom'
import AuthService from './AuthService'

const AuthStatus = withRouter(({ history }) => (
    AuthService.isAuthenticated ? (
      <button onClick={() => {
          AuthService.logout(() => history.push('/'))
        }}>Sign out</button>
    ) : (
      <button onClick={() => history.push('/login')}>Login</button>
    )
))

export default AuthStatus