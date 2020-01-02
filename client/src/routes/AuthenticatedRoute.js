import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const AuthenticatedRoute = ({
  component: Component,
  children,
  isAuthenticated,
  render,
  ...rest
}) => {
  if (isAuthenticated && render) {
    return <Route {...rest} render={render} />
  } else {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
        }
      />
    )
  }
}

export default AuthenticatedRoute
