import React from 'react'
import { Link } from 'react-router-dom'
import headerLogo from '../../assets/Monty-logo2.png'
import { __ClearToken } from '../../services/TokenServices'
const AdminSidebar = ({ setAuthenticated }) => (
  <nav className="sidebar admin-sidebar">
    <div className="col">
      <div className="header-logo-container">
        <img src={headerLogo} alt="Monty logo" className="header-logo" />
      </div>
      <li className="nav-one">
        <Link to="/admin/dashboard">Dashboard</Link>
      </li>
      <li className="nav-one">
        <Link to="/admin/inventory">Inventory</Link>
      </li>
      <li className="nav-one">
        <Link to="/admin/customers">Customers</Link>
      </li>
      <li className="nav-one">
        <Link to="/admin/add-inventory">Add To Inventory</Link>
      </li>
    </div>
    <div className="nav-column-two">
      <div className="col">
        <li
          className="nav-one"
          onClick={() => {
            setAuthenticated(false)
            return __ClearToken()
          }}
        >
          <Link to="/">Sign Out</Link>
        </li>
      </div>
    </div>
  </nav>
)

export default AdminSidebar
