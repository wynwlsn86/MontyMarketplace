import React from 'react'
import './App.css'
import { Route, Switch } from 'react-router-dom'
import { Footer } from './components/common'
import Header from './components/common/Header'
import Home from './components/Home'
import About from './components/About'
import AllProducts from './components/AllProducts'
import ProductPage from './components/ProductPage'
import Contact from './components/Contact'
import Phones from './components/Phones'
import AdminDashbord from './components/AdminDashbord'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import SignIn from './components/SignIn'

function App() {
	return (
		<div className="App">
			<Header />
			<main>
				<Switch>
					{/* <AdminDashbord /> */}
					<Route exact path="/" render={(props) => <Home {...props} />} />
					<Route path="/about" render={(props) => <About {...props} />} />
					<Route
						exact
						path="/marketplace/apparel"
						render={(props) => <AllProducts {...props} />}
					/>
					<Route
						exact
						path="/marketplace/phones"
						render={(props) => <Phones {...props} />}
					/>
					<Route
						path="/marketplace/:product_type/:item_id"
						render={(props) => <ProductPage {...props} />}
					/>
					<Route path="/contact" render={(props) => <Contact {...props} />} />
					<Route
						path="/admin/login"
						render={(props) => <SignIn {...props} />}
					/>
					<Route
						path="/admin/dashboard"
						render={(props) => <AdminDashbord {...props} />}
					/>
				</Switch>
			</main>
			<Footer />
		</div>
	)
}

export default App
