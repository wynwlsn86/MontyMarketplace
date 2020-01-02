import React, { Component } from 'react'
import { Container, Card } from '../components/common/index'
import { Tabs, Tab } from 'muicss/react'
import '../styles/AdminContainer.css'
import { AdminChart } from '../components/AdminChart'
import AdminManagement from '../components/AdminManagement'
import CustomerTable from '../components/CustomerTable'
import PublicServices from '../services/PublicServices'
export default class AdminDashbord extends Component {
  constructor() {
    super()
    this.Service = new PublicServices()
    this.state = {
      inventory: [],
      orders: [],
      customers: [],
      page: 1,
      selectedItem: null,
      isLoading: false
    }
  }

  componentDidMount() {
    this.setState({ isLoading: true, selectedItem: null })
    this.fetchInventory()
    this.fetchOrders()
    this.fetchCustomers()
  }

  onTabChange = i => {
    if (i + 1 !== 3) {
      this.setState({ page: i + 1, selectedItem: null })
    } else {
      this.setState({ page: i + 1 })
    }
  }

  setSelectedItem = item => {
    this.setState({ selectedItem: item })
    this.onTabChange(2)
  }

  fetchOrders = async () => {
    try {
      const orders = await this.Service.getOrders()
      this.setState({ orders })
    } catch (error) {
      throw error
    }
  }

  fetchCustomers = async () => {
    try {
      const customers = await this.Service.getCustomers()
      this.setState({ customers })
    } catch (error) {
      throw error
    }
  }

  fetchInventory = async () => {
    const inventory = await this.Service.getInventory()
    this.setState({ inventory, isLoading: false })
  }

  render() {
    return (
      <div className="admin">
        <Container classname="admin-container">
          <Container classname="admin-top-container">
            <Card title="Total Orders">
              <h3>{this.state.orders.length}</h3>
            </Card>
            <Card title="Profit" />
            <Card title="Order Status">
              <AdminChart orders={this.state.orders} />
            </Card>
          </Container>
          <Container classname="admin-bottom-container">
            <Card title="Customers" className="customers">
              <CustomerTable customers={this.state.customers} />
            </Card>
            <Card className="manage">
              <Tabs
                justified={true}
                selectedIndex={this.state.page - 1}
                className="tab-header"
                onChange={this.onTabChange}
              >
                <Tab value="inventory" label="Inventory" />
                <Tab value="add-inventory" label="Add To Inventory" />
                <Tab value="manage-inventory" label="Manage Inventory" />
              </Tabs>
              <AdminManagement
                page={this.state.page}
                setSelectedItem={this.setSelectedItem}
                onTabChange={this.onTabChange}
                inventory={this.state.inventory}
                isLoading={this.state.isLoading}
                selectedItem={this.state.selectedItem}
              />
            </Card>
          </Container>
        </Container>
      </div>
    )
  }
}
