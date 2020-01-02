import React, { useEffect, useState } from 'react'
import Routes from './routes/Routes'
import './App.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false)
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
