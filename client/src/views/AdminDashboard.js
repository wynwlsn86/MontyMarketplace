import React, { Component } from 'react'
import PublicServices from '../services/PublicServices'
export default class AdminDashboard extends Component {
  constructor() {
    super()
    this.Service = new PublicServices()
    this.state = {
      isLoading: false
    }
  }

  render() {
    return <div className="admin">Test</div>
  }
}
