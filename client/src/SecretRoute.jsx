import React from 'react'
import AuthService from './Auth/AuthService.js'
import {Route, Redirect} from 'react-router-dom'

const SecretRoute = ({ render: Component, ...rest }) => {
  return(
  <Route {...rest} render={(props) => (
    typeof AuthService.isAuthenticated === "boolean"
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
      }} />
  )} />
);
}


export default SecretRoute

