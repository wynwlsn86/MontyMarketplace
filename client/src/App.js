import React, { useEffect, useState } from 'react'
import Routes from './routes/Routes'
import './App.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import { __GetToken } from './services/TokenServices'

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false)
  const CheckForToken = () => {
    if (__GetToken()) {
      setAuthenticated(true)
    }
  }
  useEffect(() => CheckForToken(), [isAuthenticated])

  return (
    <div className="App">
      <Routes
        isAuthenticated={isAuthenticated}
        setAuthenticated={setAuthenticated}
      />
    </div>
  )
}

export default App
