import React from 'react'
import { NavLink } from 'react-router-dom'
import headerLogo from '../../assets/Monty-logo2.png'
import { __ClearToken } from '../../services/TokenServices'
const AdminSidebar = ({ setAuthenticated }) => (
  <nav className="sidebar admin-sidebar">
    <div className="col">
      <div className="header-logo-container">
        <img src={headerLogo} alt="Monty logo" className="header-logo" />
      </div>
      <li className="nav-one">
        <NavLink activeClassName="nav-active" to="/admin/dashboard">
          Dashboard
        </NavLink>
      </li>
      <li className="nav-one">
        <NavLink activeClassName="nav-active" to="/admin/inventory">
          Inventory
        </NavLink>
      </li>
      <li className="nav-one">
        <NavLink activeClassName="nav-active" to="/admin/customers">
          Customers
        </NavLink>
      </li>
      <li className="nav-one">
        <NavLink activeClassName="nav-active" to="/admin/add-inventory">
          Add To Inventory
        </NavLink>
      </li>
      <li className="nav-one">
        <NavLink activeClassName="nav-active" to="/admin/departments">
          Manage Departments
        </NavLink>
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
          <NavLink activeClassName="nav-active" to="/">
            Sign Out
          </NavLink>
        </li>
      </div>
    </div>
  </nav>
)

export default AdminSidebar
