import React from 'react'
import Carousel from '../components/Carousel'

import homeBanner from '../assets/BANNER2.PNG'

import '../styles/Home.css'

const Home = () => (
  <div>
    <div className="home-banner-container">
    <img src={homeBanner} alt="banner" className="home-banner"/>
    </div>
    <Carousel />
  </div>
)

export default Home
