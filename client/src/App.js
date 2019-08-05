import React from 'react'
import './App.css'
import { Route, Switch, Link } from 'react-router-dom'
import { Header, Footer } from './components/common'
import Home from './components/Home'
import About from './components/About'
import Products from './components/Products'
import Product from './components/Product'
import Contact from './components/Contact'

function App() {
	return (
		<div className="App">
			<Header />
			<main>
				<Switch>
					<Route exact path="/" render={(props) => <Home {...props} />} />
					<Route path="/about" render={(props) => <About {...props} />} />
					<Route
						exact
						path="/marketplace"
						render={(props) => <Products {...props} />}
					/>
					<Route
						path="/marketplace/:item_id"
						render={(props) => <Product {...props} />}
					/>
					<Route path="/contact" render={(props) => <Contact {...props} />} />
				</Switch>
			</main>
			<Footer />
		</div>
	)
}

export default App
