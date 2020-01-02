import React from 'react'
import AdminSidebar from '../components/common/AdminSidebar'
import '../styles/AdminWrapper.css'

const AdminWrapper = ({ children, setAuthenticated }) => (
  <main className="wrapper admin">
    <AdminSidebar setAuthenticated={setAuthenticated} />
    <div className="content admin">{children}</div>
  </main>
)

export default AdminWrapper
