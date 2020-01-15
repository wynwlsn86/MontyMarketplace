import React from 'react'
import PrivateRoutes from './PrivateRoutes'
import PublicRoutes from './PublicRoutes'

const Routes = ({ isAuthenticated, setAuthenticated }) =>
  isAuthenticated === true ? (
    <PrivateRoutes
      isAuthenticated={isAuthenticated}
      setAuthenticated={setAuthenticated}
    />
  ) : (
    <PublicRoutes
      isAuthenticated={isAuthenticated}
      setAuthenticated={setAuthenticated}
    />
  )

export default Routes
