import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from '../views/Home'
import About from '../views/About'
import AllProducts from '../views/AllProducts'
import ProductPage from '../views/ProductPage'
import Contact from '../views/Contact'
import Phones from '../views/Phones'
import SignIn from '../views/SignIn'
import PublicWrapper from './PublicWrapper'

const PublicRoutes = ({ isAuthenticated, setAuthenticated }) => (
  <PublicWrapper isAuthenticated={isAuthenticated}>
    <Switch>
      <Route exact path="/" render={props => <Home {...props} />} />
      <Route path="/about" render={props => <About {...props} />} />
      <Route
        exact
        path="/marketplace/apparel"
        render={props => <AllProducts {...props} />}
      />
      <Route
        exact
        path="/marketplace/phones"
        render={props => <Phones {...props} />}
      />
      <Route
        path="/marketplace/:product_type/:item_id"
        render={props => <ProductPage {...props} />}
      />
      <Route path="/contact" render={props => <Contact {...props} />} />
      <Route
        path="/admin/login"
        render={props => (
          <SignIn
            {...props}
            isAuthenticated={isAuthenticated}
            setAuthenticated={setAuthenticated}
          />
        )}
      />
    </Switch>
  </PublicWrapper>
)

export default PublicRoutes
