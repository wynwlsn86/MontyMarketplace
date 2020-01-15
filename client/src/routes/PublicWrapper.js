import React from 'react'
import { Footer } from '../components/common'
import Header from '../components/common/Header'

const PublicWrapper = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
export default PublicWrapper
