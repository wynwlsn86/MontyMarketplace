import React from 'react'
import { Footer } from '../components/common'
import Header from '../components/common/Header'

const AuthenticatedOptions = children => <>{children}</>

const PublicOptions = children => (
  <>
    <Header />
    {children}
    <Footer />
  </>
)

const Wrapper = ({ children, isAuthenticated }) => {
  return isAuthenticated
    ? AuthenticatedOptions(children)
    : PublicOptions(children)
}
export default Wrapper
