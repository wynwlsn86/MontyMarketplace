import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "../styles/Carousel.css";

import shopPhoto from "../assets/shop-photo.png";
import apparelPhoto from "../assets/apparel-photo.png";
import phonePhoto from "../assets/phone-photo.png";

export default class DemoCarousel extends Component {
  render() {
    return (
      <div className="carousel-center">
        <div className="carousel-container">
          <Carousel
            showStatus={false}
            showThumbs={false}
            infiniteLoop={true}
            autoPlay={true}
            interval={4000}
          >
            <div>
              <img src={shopPhoto} alt="shop" />
              <p className="legend">
                Legend 1
                <br />
                Content will go here.
                <br />
                Breaks are used for separation of lines.
                <br />
                Content will be wrapped in a single paragraph tag.
                <br />
                Legend has hover effect, flex wrap and line height.
              </p>
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
        </div>
      </div>
    );
  }
}
