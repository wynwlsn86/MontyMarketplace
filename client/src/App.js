import React, { useEffect, useState } from 'react'
import Routes from './routes/Routes'
import { withRouter } from 'react-router-dom'
import './App.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import { __GetToken } from './services/TokenServices'

function App(props) {
  const [isAuthenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    if (__GetToken()) {
      setAuthenticated(true)
      props.history.push('/admin/dashboard')
    }
  }, [isAuthenticated, props.history])

  return (
    <div className="App">
      <Routes
        isAuthenticated={isAuthenticated}
        setAuthenticated={setAuthenticated}
      />
    </div>
  )
}

export default withRouter(App)
