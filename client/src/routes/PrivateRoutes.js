import React from 'react'
import { Switch } from 'react-router-dom'
import AuthenticatedRoute from './AuthenticatedRoute'
import AdminDashboard from '../views/AdminDashboard'
import AdminWrapper from './PrivateWrapper'
import AdminForm from '../components/private/AdminForm'
import Departments from '../components/private/Departments'
import ApparelUpdateForm from '../components/private/ApparelUpdateForm'
import Inventory from '../components/private/Inventory'

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
      <AuthenticatedRoute
        exact
        isAuthenticated={isAuthenticated}
        path="/admin/departments"
        render={props => <Departments {...props} />}
      />
      <AuthenticatedRoute
        exact
        isAuthenticated={isAuthenticated}
        path="/admin/update-inventory/apparel/:item_id"
        render={props => <ApparelUpdateForm {...props} />}
      />
      <AuthenticatedRoute
        exact
        isAuthenticated={isAuthenticated}
        path="/admin/inventory"
        render={props => <Inventory {...props} />}
      />
    </Switch>
  </AdminWrapper>
)

export default PrivateRoutes
