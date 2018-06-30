import React from 'react'
import { withRouter } from 'react-router-dom'
import AuthService from './AuthService'

const AuthStatus = withRouter(({ history }) => (
    AuthService.isAuthenticated ? (
      <button onClick={() => {
          AuthService.logout(() => history.push('/'))
        }}>Sign out</button>
    ) : (
      <span>Log in</span>
    )
))

export default AuthStatus