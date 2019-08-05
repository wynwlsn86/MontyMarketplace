import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "./Carousel.css";

import shopPhoto from "../assets/shop-photo.png";
import apparelPhoto from "../assets/apparel-photo.png";
import phonePhoto from "../assets/phone-photo.png";

export default class DemoCarousel extends Component {
  render() {
    return (
      <Carousel>
        <div>
          <img src={shopPhoto} alt="shop" />
          <p className="legend">Legend 1</p>
        </div>
        <div>
          <img src={apparelPhoto} alt="apparel" />
          <p className="legend">Legend 2</p>
        </div>
        <div>
          <img src={phonePhoto} alt="phone" />
          <p className="legend">Legend 3</p>
        </div>
      </Carousel>
    );
  }
}
