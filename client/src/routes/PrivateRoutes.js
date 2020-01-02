import React from 'react'
import { Switch } from 'react-router-dom'
import AuthenticatedRoute from './AuthenticatedRoute'

import AdminDashboard from '../views/AdminDashboard'
import AdminWrapper from './PrivateWrapper'
import AdminForm from '../components/private/AdminForm'

const PrivateRoutes = ({ isAuthenticated, setAuthenticated }) => (
  <AdminWrapper setAuthenticated={setAuthenticated}>
    <Switch>
      <AuthenticatedRoute
        exact
        isAuthenticated={isAuthenticated}
        path="/admin/dashboard"
        render={props => <AdminDashboard {...props} />}
      />
      <AuthenticatedRoute
        exact
        isAuthenticated={isAuthenticated}
        path="/admin/add-inventory"
        render={props => <AdminForm {...props} />}
      />
    </Switch>
  </AdminWrapper>
)

export default PrivateRoutes
