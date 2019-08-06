import React from 'react'
import './App.css'
import { Route, Switch } from 'react-router-dom'
import { Header, Footer } from './components/common'
import Home from './components/Home'
import About from './components/About'
import Products from './components/Products'
import Product from './components/Product'
import Contact from './components/Contact'
import Phones from './components/Phones'

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
						path="/marketplace/apparel"
						render={(props) => <Products {...props} />}
					/>
					<Route
						exact
						path="/marketplace/phones"
						render={(props) => <Phones {...props} />}
					/>
					<Route
						path="/marketplace/:product_type/:item_id"
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
